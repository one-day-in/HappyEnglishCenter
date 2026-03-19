import type { Profile, Group, ScheduleSlot, Homework, HomeworkCompletion } from '@/types'

export const mockTeacher: Profile = {
  id: 'teacher-1',
  full_name: 'Ms. Olena',
  role: 'teacher',
  email: 'teacher@happyenglish.ua',
}

export const mockAdmin: Profile = {
  id: 'admin-1',
  full_name: 'Admin',
  role: 'admin',
  email: 'admin@happyenglish.ua',
}

export const mockStudents: Profile[] = [
  { id: 'student-1', full_name: 'Anna K.', role: 'student', email: 'anna@example.com' },
  { id: 'student-2', full_name: 'John M.', role: 'student', email: 'john@example.com' },
  { id: 'student-3', full_name: 'Sofia L.', role: 'student', email: 'sofia@example.com' },
  { id: 'student-4', full_name: 'Mykyta R.', role: 'student', email: 'mykyta@example.com' },
]

export const mockGroups: Group[] = [
  { id: 'group-1', name: 'Kids A1', level: 'Beginner', teacher_id: 'teacher-1', teacher: mockTeacher },
  { id: 'group-2', name: 'Teens B2', level: 'Upper-Intermediate', teacher_id: 'teacher-1', teacher: mockTeacher },
]

export const DAY_NAMES = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const DAY_NAMES_FULL = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const mockSchedule: ScheduleSlot[] = [
  // Monday
  {
    id: 'slot-m1', group_id: 'group-1', day_of_week: 1,
    start_time: '15:00', end_time: '16:30', room: '110.1',
    class_code: 'G1BK1K11', curriculum: 'Super Minds 1',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Quyen', duration: 1.25,
    group: mockGroups[0],
    content: ['Unit 6: The Old House (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 76–77', 'Super grammar book: Page 59'],
  },
  {
    id: 'slot-m2', group_id: 'group-2', day_of_week: 1,
    start_time: '17:00', end_time: '18:30', room: '106',
    class_code: 'G5ABM1', curriculum: 'Super Minds 4',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Giao', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 6: In Istanbul (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 80–81', 'Super grammar book: Page 59'],
  },
  // Tuesday
  {
    id: 'slot-t1', group_id: 'group-1', day_of_week: 2,
    start_time: '15:00', end_time: '16:30', room: '108',
    class_code: 'F1A2K10K11', curriculum: 'First Friends 1',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Nhi', duration: 1.25,
    group: mockGroups[0],
    content: ['Unit 5: Shapes and Colours', 'Lesson 5–6', 'Songs and projects: Ten birds', 'Vocabulary: blue, brown, green, orange, pink, red, yellow, circle, diamond, heart, rectangle, star, square, triangle'],
  },
  {
    id: 'slot-t2', group_id: 'group-2', day_of_week: 2,
    start_time: '17:30', end_time: '19:00', room: '110.1',
    class_code: 'G3BK9K12', curriculum: 'Super Minds 3',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Khuyen', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 4: Around Town (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 46–47'],
  },
  // Wednesday
  {
    id: 'slot-w1', group_id: 'group-1', day_of_week: 3,
    start_time: '15:00', end_time: '16:30', room: '110.1',
    class_code: 'G1BK1K11', curriculum: 'Super Minds 1',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Quyen', duration: 1.25,
    group: mockGroups[0],
    content: ['Unit 6: The Old House (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 76–77', 'Super grammar book: Page 59', 'Read the story (February): Yellow'],
  },
  // Thursday
  {
    id: 'slot-th1', group_id: 'group-2', day_of_week: 4,
    start_time: '17:00', end_time: '18:30', room: '106',
    class_code: 'G5ABM1', curriculum: 'Super Minds 4',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Giao', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 6: In Istanbul (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 80–81'],
  },
  // Friday
  {
    id: 'slot-f1', group_id: 'group-1', day_of_week: 5,
    start_time: '15:00', end_time: '16:30', room: '108',
    class_code: 'F1A2K10K11', curriculum: 'First Friends 1',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Nhi', duration: 1.25,
    group: mockGroups[0],
    content: ['Unit 5: Shapes and Colours', 'Lesson 5–6', 'Vocabulary review'],
  },
  {
    id: 'slot-f2', group_id: 'group-2', day_of_week: 5,
    start_time: '17:30', end_time: '19:00', room: '110.1',
    class_code: 'G3BK9K12', curriculum: 'Super Minds 3',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Khuyen', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 4: Around Town (cont)', 'CB: Page 46–47'],
  },
  // Saturday
  {
    id: 'slot-s1', group_id: 'group-1', day_of_week: 6,
    start_time: '07:30', end_time: '09:00', room: '110.1',
    class_code: 'G1BK1K11', curriculum: 'Super Minds 1',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Quyen', duration: 1.25,
    group: mockGroups[0],
    content: ['Unit 6: The Old House (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 76–77', 'Super grammar book: Page 59', 'Read the story (February): Yellow'],
  },
  {
    id: 'slot-s2', group_id: 'group-1', day_of_week: 6,
    start_time: '09:30', end_time: '11:00', room: '108',
    class_code: 'F1A2K10K11', curriculum: 'First Friends 1',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Nhi', duration: 1.25,
    group: mockGroups[0],
    content: ['Unit 5: Shapes and Colours', 'Lesson 5–6', 'Songs and projects: Ten birds', 'Vocabulary: blue, brown, green, orange, pink, red, yellow, circle, diamond, heart, rectangle, star, square, triangle'],
  },
  {
    id: 'slot-s3', group_id: 'group-2', day_of_week: 6,
    start_time: '13:30', end_time: '15:00', room: '106',
    class_code: 'G5AB2M1', curriculum: 'Super Minds 4',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Hong', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 6: In Istanbul (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 80–81', 'Super grammar book: Page 59'],
  },
  {
    id: 'slot-s4', group_id: 'group-2', day_of_week: 6,
    start_time: '15:30', end_time: '17:00', room: '106',
    class_code: 'G5ABM1', curriculum: 'Super Minds 4',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Giao', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 6: In Istanbul (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 80–81', 'Super grammar book: Page 59'],
  },
  {
    id: 'slot-s5', group_id: 'group-2', day_of_week: 6,
    start_time: '17:30', end_time: '19:00', room: '110.1',
    class_code: 'G3BK9K12', curriculum: 'Super Minds 3',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Khuyen', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 4: Around Town (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 46–47'],
  },
]

export const mockHomework: Homework[] = [
  {
    id: 'hw-1',
    group_id: 'group-1',
    teacher_id: 'teacher-1',
    title: 'Learn 10 new words',
    description: 'Study vocabulary from Unit 3, pages 24-25. Be ready to use them in a sentence.',
    due_date: '2026-03-20',
    created_at: '2026-03-15T10:00:00Z',
    group: mockGroups[0],
  },
  {
    id: 'hw-2',
    group_id: 'group-1',
    teacher_id: 'teacher-1',
    title: 'Read page 24',
    description: 'Read the story "The Lost Key" and answer the questions at the end.',
    due_date: '2026-03-22',
    created_at: '2026-03-15T11:00:00Z',
    group: mockGroups[0],
  },
  {
    id: 'hw-3',
    group_id: 'group-2',
    teacher_id: 'teacher-1',
    title: 'Write a short essay',
    description: 'Write 150-200 words about your favourite season and explain why you like it.',
    due_date: '2026-03-21',
    created_at: '2026-03-14T09:00:00Z',
    group: mockGroups[1],
  },
  {
    id: 'hw-4',
    group_id: 'group-2',
    teacher_id: 'teacher-1',
    title: 'Grammar exercises',
    description: 'Complete exercises 3, 4, and 5 on page 67 of your workbook.',
    due_date: '2026-03-19',
    created_at: '2026-03-13T14:00:00Z',
    group: mockGroups[1],
  },
]

export const mockCompletions: HomeworkCompletion[] = [
  { id: 'comp-1', homework_id: 'hw-1', student_id: 'student-1', completed_at: '2026-03-17T18:00:00Z' },
]
