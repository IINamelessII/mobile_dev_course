"""Custom class for manipulating time objects"""

import unittest


class Quantity:
	"""Data descriptor that accepts an int greater or equal to 0"""
	field_name = None

	def __set_name__(self, owner, name):
		self.field_name = name

	def __init__(self, max_value):
		self.max_value = max_value

	def __set__(self, instance, value):
		if not (isinstance(value, int) and 0 <= value <= self.max_value):
			raise ValueError(f'Value must be an int in 0 - {self.max_value} range')
		instance.__dict__[self.field_name] = value


class TimeOS:
	"""Time object implemented by Oleh Serikov (RecordBook #7222)"""

	hours = Quantity(max_value=23)
	minutes = Quantity(max_value=59)
	seconds = Quantity(max_value=59)

	def __init__(self, hours=0, minutes=0, seconds=0):
		self.hours = hours
		self.minutes = minutes
		self.seconds = seconds

	@classmethod
	def from_timeos(cls, other):
		return cls(other.hours, other.minutes, other.seconds)

	def __str__(self):
		"""String representation using ISO 8601 standart"""
		if self.hours < 12:
			meridiem, hours = 'AM', self.hours if self.hours else 12
		else:
			meridiem, hours = 'PM', 12 if self.hours == 12 else self.hours - 12
		return f'{hours:0>2}:{self.minutes:0>2}:{self.seconds:0>2} {meridiem}'

	def __add__(self, other):
		minutes, seconds = divmod(self.seconds + other.seconds, 60)
		hours, minutes = divmod(self.minutes + other.minutes + minutes, 60)
		_, hours = divmod(self.hours + other.hours + hours, 24)
		return self.__class__(hours, minutes, seconds)

	def __sub__(self, other):
		minutes, seconds = divmod(self.seconds - other.seconds, 60)
		hours, minutes = divmod(self.minutes - other.minutes + minutes, 60)
		_, hours = divmod(self.hours - other.hours + hours, 24)
		return self.__class__(hours, minutes, seconds)


if __name__ == '__main__':

	# 5a - using defaults (zeros)
	zeros = TimeOS()

	# 5b - valid data
	sample_time = TimeOS(11, 23, 45)

	# 5b - wrong data
	# personally I prefer pytest, but it's not within builtins, so let's use unittest :)
	with unittest.TestCase().assertRaises(ValueError) as context:
		TimeOS(11, -23, 45)
	assert str(context.exception) == 'Value must be an int in 0 - 59 range'

	# 5c - from another TimeOS object
	another_time = TimeOS.from_timeos(sample_time)
	assert sample_time is not another_time  # different objects

	# 6a - cute strings for users
	print(zeros)  # 12:00:00 AM
	print(sample_time)  # 11:23:45 AM
	print(TimeOS(12, 34, 56))  # 12:34:56 PM
	print(TimeOS(23, 26, 4))  # 11:26:04 PM

	# 6b / 7a - sum of two TimeOS objects
	print(TimeOS(1, 55, 32) + TimeOS(2, 23, 28))  # 04:19:00 AM
	print(TimeOS(23, 59, 59) + TimeOS(12, 0, 1))  # 12:00:00 PM

	# 6c / 7b - difference of two TimeOS objects
	print(TimeOS(17, 22, 55) - TimeOS(13, 2, 55))  # 04:20:00 AM
	print(TimeOS() - TimeOS(seconds=1))  # 11:59:59 PM
