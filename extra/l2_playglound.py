"""Assinments' solutions from ``playground.swift``"""

import bisect
import math
from random import randint
from statistics import mean


def random_value(max_value):
	generated = randint(0, 5)
	if not generated:  # generated = 0
		return 0
	if generated == 1:
		return math.ceil(max_value * .7)
	if generated == 2:
		return math.ceil(max_value * 0.9)
	return max_value


# Task 1
students_str = 'Бортнік Василь - ІВ-72; Чередніченко Владислав - ІВ-73; Гуменюк Олександр - ІВ-71; Корнійчук Ольга - ІВ-71; Киба Олег - ІВ-72; Капінус Артем - ІВ-73; Овчарова Юстіна - ІВ-72; Науменко Павло - ІВ-73; Трудов Антон - ІВ-71; Музика Олександр - ІВ-71; Давиденко Костянтин - ІВ-73; Андрющенко Данило - ІВ-71; Тимко Андрій - ІВ-72; Феофанов Іван - ІВ-71; Гончар Юрій - ІВ-73'
students_groups = {}

# solution
for record in students_str.split('; '):
	student, group = record.split(' - ')
	bisect.insort(students_groups.setdefault(group, []), student)

print(students_groups, '\n')

# Task 2
points = [5, 8, 12, 12, 12, 12, 12, 12, 15]

# solution
student_points = {
	group: {student: [random_value(value) for value in points] for student in students}
	for group, students in students_groups.items()
}

print(student_points, '\n')

# Task 3
# solution
sum_points = {
	group: {student: sum(points) for student, points in students.items()}
	for group, students in student_points.items()
}

print(sum_points, '\n')

# Task 4
# solution
group_avg = {group: mean(students.values()) for group, students in sum_points.items()}

print(group_avg, '\n')

# Task 5
# solution
passed_per_group = {
	group: [student for student, mark in students.items() if mark >= 60]
	for group, students in sum_points.items()
}

print(passed_per_group)
