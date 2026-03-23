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
    class_code: 'Thiếu nhi A1 - Nhóm 1', curriculum: 'Super Minds 1',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Quyen', duration: 1.25,
    group: mockGroups[0],
    content: ['Unit 6: The Old House (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 76–77', 'Super grammar book: Page 59'],
  },
  {
    id: 'slot-m2', group_id: 'group-2', day_of_week: 1,
    start_time: '17:00', end_time: '18:30', room: '106',
    class_code: 'Thiếu niên A - Nhóm 4', curriculum: 'Super Minds 4',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Giao', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 6: In Istanbul (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 80–81', 'Super grammar book: Page 59'],
  },
  // Tuesday
  {
    id: 'slot-t1', group_id: 'group-1', day_of_week: 2,
    start_time: '15:00', end_time: '16:30', room: '108',
    class_code: 'Mầm non - Nhóm 2', curriculum: 'First Friends 1',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Nhi', duration: 1.25,
    group: mockGroups[0],
    content: ['Unit 5: Shapes and Colours', 'Lesson 5–6', 'Songs and projects: Ten birds', 'Vocabulary: blue, brown, green, orange, pink, red, yellow, circle, diamond, heart, rectangle, star, square, triangle'],
  },
  {
    id: 'slot-t2', group_id: 'group-2', day_of_week: 2,
    start_time: '17:30', end_time: '19:00', room: '110.1',
    class_code: 'Thiếu nhi B - Nhóm 5', curriculum: 'Super Minds 3',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Khuyen', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 4: Around Town (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 46–47'],
  },
  // Wednesday
  {
    id: 'slot-w1', group_id: 'group-1', day_of_week: 3,
    start_time: '15:00', end_time: '16:30', room: '110.1',
    class_code: 'Thiếu nhi A1 - Nhóm 1', curriculum: 'Super Minds 1',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Quyen', duration: 1.25,
    group: mockGroups[0],
    content: ['Unit 6: The Old House (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 76–77', 'Super grammar book: Page 59', 'Read the story (February): Yellow'],
  },
  // Thursday
  {
    id: 'slot-th1', group_id: 'group-2', day_of_week: 4,
    start_time: '17:00', end_time: '18:30', room: '106',
    class_code: 'Thiếu niên A - Nhóm 4', curriculum: 'Super Minds 4',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Giao', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 6: In Istanbul (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 80–81'],
  },
  // Friday
  {
    id: 'slot-f1', group_id: 'group-1', day_of_week: 5,
    start_time: '15:00', end_time: '16:30', room: '108',
    class_code: 'Mầm non - Nhóm 2', curriculum: 'First Friends 1',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Nhi', duration: 1.25,
    group: mockGroups[0],
    content: ['Unit 5: Shapes and Colours', 'Lesson 5–6', 'Vocabulary review'],
  },
  {
    id: 'slot-f2', group_id: 'group-2', day_of_week: 5,
    start_time: '17:30', end_time: '19:00', room: '110.1',
    class_code: 'Thiếu nhi B - Nhóm 5', curriculum: 'Super Minds 3',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Khuyen', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 4: Around Town (cont)', 'CB: Page 46–47'],
  },
  // Saturday
  {
    id: 'slot-s1', group_id: 'group-1', day_of_week: 6,
    start_time: '07:30', end_time: '09:00', room: '110.1',
    class_code: 'Thiếu nhi A1 - Nhóm 1', curriculum: 'Super Minds 1',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Quyen', duration: 1.25,
    group: mockGroups[0],
    content: ['Unit 6: The Old House (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 76–77', 'Super grammar book: Page 59', 'Read the story (February): Yellow'],
  },
  {
    id: 'slot-s2', group_id: 'group-1', day_of_week: 6,
    start_time: '09:30', end_time: '11:00', room: '108',
    class_code: 'Mầm non - Nhóm 2', curriculum: 'First Friends 1',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Nhi', duration: 1.25,
    group: mockGroups[0],
    content: ['Unit 5: Shapes and Colours', 'Lesson 5–6', 'Songs and projects: Ten birds', 'Vocabulary: blue, brown, green, orange, pink, red, yellow, circle, diamond, heart, rectangle, star, square, triangle'],
  },
  {
    id: 'slot-s3', group_id: 'group-2', day_of_week: 6,
    start_time: '13:30', end_time: '15:00', room: '106',
    class_code: 'Thiếu niên A - Nhóm 3', curriculum: 'Super Minds 4',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Hong', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 6: In Istanbul (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 80–81', 'Super grammar book: Page 59'],
  },
  {
    id: 'slot-s4', group_id: 'group-2', day_of_week: 6,
    start_time: '15:30', end_time: '17:00', room: '106',
    class_code: 'Thiếu niên A - Nhóm 4', curriculum: 'Super Minds 4',
    teacher_main: 'Mr Joey', teacher_assistant: 'Ms Giao', duration: 1.25,
    group: mockGroups[1],
    content: ['Unit 6: In Istanbul (cont)', 'Say Vocabulary (in syllabus)', 'CB: Page 80–81', 'Super grammar book: Page 59'],
  },
  {
    id: 'slot-s5', group_id: 'group-2', day_of_week: 6,
    start_time: '17:30', end_time: '19:00', room: '110.1',
    class_code: 'Thiếu nhi B - Nhóm 5', curriculum: 'Super Minds 3',
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

/* ══════════════════════════════════════════════
   BRANCH DATA
══════════════════════════════════════════════ */

export interface Branch {
  id: string
  name: string
  address: string
  color: string
}

export const BRANCHES: Branch[] = [
  { id: 'buon-ho',       name: 'Buôn Hồ',      address: '390 Hùng Vương, P. Buôn Hồ',      color: '#6B3A3A' },
  { id: 'ea-leo',        name: 'Ea Leo',         address: '787 Giải Phóng, Xã Ea Đrăng',     color: '#1D6FA4' },
  { id: 'krong-nang',    name: 'Krông Năng',     address: '190 Hùng Vương, Xã Krông Năng',  color: '#059669' },
  { id: 'buon-ma-thuot', name: 'Buôn Ma Thuột',  address: 'Ecocity, P. Tân An',              color: '#7C3AED' },
]

export interface BranchData {
  teachers: Profile[]
  students: Profile[]
  groups: Group[]
  schedule: ScheduleSlot[]
  homework: Homework[]
}

export const branchMockData: Record<string, BranchData> = {
  'buon-ho': {
    teachers: [
      { id: 'bh-t1', full_name: 'Mr. Joey',  role: 'teacher', email: 'joey@happy.vn' },
      { id: 'bh-t2', full_name: 'Ms. Quyên', role: 'teacher', email: 'quyen@happy.vn' },
    ],
    students: [
      { id: 'bh-s1', full_name: 'Nguyễn Minh Anh',  role: 'student', email: 's1@bh.vn' },
      { id: 'bh-s2', full_name: 'Trần Bảo Long',     role: 'student', email: 's2@bh.vn' },
      { id: 'bh-s3', full_name: 'Lê Thị Thu Hà',     role: 'student', email: 's3@bh.vn' },
      { id: 'bh-s4', full_name: 'Phạm Gia Huy',      role: 'student', email: 's4@bh.vn' },
      { id: 'bh-s5', full_name: 'Đỗ Thanh Tâm',      role: 'student', email: 's5@bh.vn' },
      { id: 'bh-s6', full_name: 'Hoàng Khánh Ly',    role: 'student', email: 's6@bh.vn' },
    ],
    groups: [
      { id: 'bh-g1', name: 'Thiếu nhi A1',             level: 'Beginner',           teacher_id: 'bh-t1' },
      { id: 'bh-g2', name: 'Thiếu niên Trung cấp',  level: 'Upper-Intermediate', teacher_id: 'bh-t2' },
    ],
    schedule: [
      { id: 'bh-sl1', group_id: 'bh-g1', day_of_week: 1, start_time: '15:00', end_time: '16:30', room: '101', class_code: 'Thiếu nhi A1', curriculum: 'Super Minds 1', teacher_main: 'Mr. Joey', teacher_assistant: 'Ms. Quyên', duration: 1.5, content: ['Unit 5: My House', 'CB: Page 60–61', 'Vocabulary: rooms, furniture'] },
      { id: 'bh-sl2', group_id: 'bh-g1', day_of_week: 3, start_time: '15:00', end_time: '16:30', room: '101', class_code: 'Thiếu nhi A1', curriculum: 'Super Minds 1', teacher_main: 'Mr. Joey', teacher_assistant: 'Ms. Quyên', duration: 1.5, content: ['Unit 5 (cont)', 'Grammar: There is/are', 'Workbook: Page 48'] },
      { id: 'bh-sl3', group_id: 'bh-g2', day_of_week: 2, start_time: '17:30', end_time: '19:00', room: '102', class_code: 'Thiếu niên B1', curriculum: 'Navigate B1', teacher_main: 'Ms. Quyên', duration: 1.5, content: ['Unit 8: Technology', 'Reading: Smart cities', 'Speaking practice: debate'] },
      { id: 'bh-sl4', group_id: 'bh-g2', day_of_week: 5, start_time: '17:30', end_time: '19:00', room: '102', class_code: 'Thiếu niên B1', curriculum: 'Navigate B1', teacher_main: 'Ms. Quyên', duration: 1.5, content: ['Unit 8 (cont)', 'Writing: Opinion essay', 'Peer review'] },
    ],
    homework: [
      { id: 'bh-hw1', title: 'Unit 5 Vocabulary Test', description: 'Learn all room/furniture words from page 60. Write 5 sentences.', due_date: '2026-03-30', group_id: 'bh-g1', teacher_id: 'bh-t1', created_at: '2026-03-23T08:00:00Z' },
      { id: 'bh-hw2', title: 'Opinion Essay Draft', description: 'Write a 150-word opinion essay on "Is technology good for children?"', due_date: '2026-03-25', group_id: 'bh-g2', teacher_id: 'bh-t2', created_at: '2026-03-23T08:00:00Z' },
    ],
  },

  'ea-leo': {
    teachers: [
      { id: 'el-t1', full_name: 'Ms. Thu Hương', role: 'teacher', email: 'thu@happy.vn' },
      { id: 'el-t2', full_name: 'Mr. Duy',       role: 'teacher', email: 'duy@happy.vn' },
    ],
    students: [
      { id: 'el-s1', full_name: 'Vũ Lan Anh',       role: 'student', email: 's1@el.vn' },
      { id: 'el-s2', full_name: 'Ngô Thành Đạt',    role: 'student', email: 's2@el.vn' },
      { id: 'el-s3', full_name: 'Bùi Phương Linh',  role: 'student', email: 's3@el.vn' },
      { id: 'el-s4', full_name: 'Đinh Quốc Hùng',   role: 'student', email: 's4@el.vn' },
      { id: 'el-s5', full_name: 'Phan Thị Mai',      role: 'student', email: 's5@el.vn' },
    ],
    groups: [
      { id: 'el-g1', name: 'Mầm non', level: 'Pre-K',    teacher_id: 'el-t1' },
      { id: 'el-g2', name: 'Người lớn A2',  level: 'A2–B1',   teacher_id: 'el-t2' },
    ],
    schedule: [
      { id: 'el-sl1', group_id: 'el-g1', day_of_week: 2, start_time: '08:00', end_time: '09:00', room: '201', class_code: 'Mầm non Nhóm 1', curriculum: 'First Friends 1', teacher_main: 'Ms. Thu Hương', duration: 1, content: ['Songs: ABC Song', 'Colours and shapes', 'Craft activity'] },
      { id: 'el-sl2', group_id: 'el-g1', day_of_week: 4, start_time: '08:00', end_time: '09:00', room: '201', class_code: 'Mầm non Nhóm 1', curriculum: 'First Friends 1', teacher_main: 'Ms. Thu Hương', duration: 1, content: ['Numbers 1–10 revision', 'Sticker activity: page 12', 'Story time'] },
      { id: 'el-sl3', group_id: 'el-g2', day_of_week: 6, start_time: '09:30', end_time: '11:00', room: '202', class_code: 'Người lớn A2', curriculum: 'English File A2', teacher_main: 'Mr. Duy', duration: 1.5, content: ['Unit 3B: At the shops', 'Grammar: Comparatives', 'Role play: shopping'] },
    ],
    homework: [
      { id: 'el-hw1', title: 'Colour & Shape Worksheet', description: 'Complete colouring worksheet from class. Name each shape in English.', due_date: '2026-03-28', group_id: 'el-g1', teacher_id: 'el-t1', created_at: '2026-03-23T08:00:00Z' },
      { id: 'el-hw2', title: 'Comparative sentences', description: 'Write 8 sentences using comparatives (bigger, faster, cheaper...)', due_date: '2026-03-29', group_id: 'el-g2', teacher_id: 'el-t2', created_at: '2026-03-23T08:00:00Z' },
    ],
  },

  'krong-nang': {
    teachers: [
      { id: 'kn-t1', full_name: 'Ms. Hoa',   role: 'teacher', email: 'hoa@happy.vn' },
      { id: 'kn-t2', full_name: 'Mr. Bình',   role: 'teacher', email: 'binh@happy.vn' },
    ],
    students: [
      { id: 'kn-s1', full_name: 'Trịnh Thị Ngọc',   role: 'student', email: 's1@kn.vn' },
      { id: 'kn-s2', full_name: 'Lý Văn Phúc',       role: 'student', email: 's2@kn.vn' },
      { id: 'kn-s3', full_name: 'Dương Mỹ Linh',     role: 'student', email: 's3@kn.vn' },
      { id: 'kn-s4', full_name: 'Cao Tuấn Khải',     role: 'student', email: 's4@kn.vn' },
      { id: 'kn-s5', full_name: 'Tô Thị Hồng Nhung', role: 'student', email: 's5@kn.vn' },
      { id: 'kn-s6', full_name: 'Nguyễn Đức Khoa',   role: 'student', email: 's6@kn.vn' },
      { id: 'kn-s7', full_name: 'Võ Thị Bích Trâm',  role: 'student', email: 's7@kn.vn' },
    ],
    groups: [
      { id: 'kn-g1', name: 'KET Thiếu nhi', level: 'A2', teacher_id: 'kn-t1' },
      { id: 'kn-g2', name: 'PET Thiếu niên',     level: 'B1', teacher_id: 'kn-t2' },
    ],
    schedule: [
      { id: 'kn-sl1', group_id: 'kn-g1', day_of_week: 1, start_time: '14:00', end_time: '15:30', room: '301', class_code: 'KET Thiếu nhi', curriculum: 'KET Practice', teacher_main: 'Ms. Hoa', duration: 1.5, content: ['KET Reading Part 1', 'Vocabulary: daily routines', 'Gap-fill practice'] },
      { id: 'kn-sl2', group_id: 'kn-g1', day_of_week: 3, start_time: '14:00', end_time: '15:30', room: '301', class_code: 'KET Thiếu nhi', curriculum: 'KET Practice', teacher_main: 'Ms. Hoa', duration: 1.5, content: ['KET Writing Part 7', 'Email writing template', 'Peer correction'] },
      { id: 'kn-sl3', group_id: 'kn-g2', day_of_week: 2, start_time: '16:00', end_time: '17:30', room: '302', class_code: 'PET Thiếu niên', curriculum: 'PET Practice', teacher_main: 'Mr. Bình', duration: 1.5, content: ['PET Listening Part 2', 'Note-taking strategies', 'Mock test review'] },
      { id: 'kn-sl4', group_id: 'kn-g2', day_of_week: 5, start_time: '16:00', end_time: '17:30', room: '302', class_code: 'PET Thiếu niên', curriculum: 'PET Practice', teacher_main: 'Mr. Bình', duration: 1.5, content: ['PET Speaking Part 1', 'Interview simulation', 'Pronunciation drill'] },
    ],
    homework: [
      { id: 'kn-hw1', title: 'KET Reading Mock Test', description: 'Complete full KET Reading practice paper. Time yourself: 45 minutes.', due_date: '2026-03-27', group_id: 'kn-g1', teacher_id: 'kn-t1', created_at: '2026-03-23T08:00:00Z' },
      { id: 'kn-hw2', title: 'PET Speaking preparation', description: 'Prepare a 2-minute talk about your hometown. Record yourself.', due_date: '2026-03-26', group_id: 'kn-g2', teacher_id: 'kn-t2', created_at: '2026-03-23T08:00:00Z' },
      { id: 'kn-hw3', title: 'Email writing practice', description: 'Write a formal email asking for information about a course.', due_date: '2026-04-01', group_id: 'kn-g1', teacher_id: 'kn-t1', created_at: '2026-03-23T08:00:00Z' },
    ],
  },

  'buon-ma-thuot': {
    teachers: [
      { id: 'bmt-t1', full_name: 'Ms. Vy',    role: 'teacher', email: 'vy@happy.vn' },
      { id: 'bmt-t2', full_name: 'Mr. Khoa',  role: 'teacher', email: 'khoa@happy.vn' },
      { id: 'bmt-t3', full_name: 'Ms. Linh',  role: 'teacher', email: 'linh@happy.vn' },
    ],
    students: [
      { id: 'bmt-s1',  full_name: 'Hồ Minh Trí',      role: 'student', email: 's1@bmt.vn' },
      { id: 'bmt-s2',  full_name: 'Kiều Thị Phương',   role: 'student', email: 's2@bmt.vn' },
      { id: 'bmt-s3',  full_name: 'Lương Văn Tú',      role: 'student', email: 's3@bmt.vn' },
      { id: 'bmt-s4',  full_name: 'Trần Ngọc Hân',     role: 'student', email: 's4@bmt.vn' },
      { id: 'bmt-s5',  full_name: 'Phùng Thị Mỹ Duyên',role: 'student', email: 's5@bmt.vn' },
      { id: 'bmt-s6',  full_name: 'Vương Quốc Bảo',    role: 'student', email: 's6@bmt.vn' },
      { id: 'bmt-s7',  full_name: 'Đặng Thị Thu Huyền',role: 'student', email: 's7@bmt.vn' },
      { id: 'bmt-s8',  full_name: 'Tạ Văn Lộc',        role: 'student', email: 's8@bmt.vn' },
      { id: 'bmt-s9',  full_name: 'Quách Thị Thanh',   role: 'student', email: 's9@bmt.vn' },
      { id: 'bmt-s10', full_name: 'Mai Xuân Quang',     role: 'student', email: 's10@bmt.vn' },
    ],
    groups: [
      { id: 'bmt-g1', name: 'Mầm non Cơ bản', level: 'Pre-A1', teacher_id: 'bmt-t3' },
      { id: 'bmt-g2', name: 'KET Thiếu nhi',      level: 'A2',     teacher_id: 'bmt-t1' },
      { id: 'bmt-g3', name: 'PET+ Thiếu niên',    level: 'B1+',    teacher_id: 'bmt-t2' },
    ],
    schedule: [
      { id: 'bmt-sl1', group_id: 'bmt-g1', day_of_week: 1, start_time: '08:00', end_time: '09:00', room: '401', class_code: 'Mầm non Cơ bản', curriculum: 'Super Minds Starter', teacher_main: 'Ms. Linh', duration: 1, content: ['Unit 2: My Family', 'Song: This is my family', 'Draw & label activity'] },
      { id: 'bmt-sl2', group_id: 'bmt-g1', day_of_week: 3, start_time: '08:00', end_time: '09:00', room: '401', class_code: 'Mầm non Cơ bản', curriculum: 'Super Minds Starter', teacher_main: 'Ms. Linh', duration: 1, content: ['Unit 2 (cont)', 'Flashcard drill', 'Workbook page 14'] },
      { id: 'bmt-sl3', group_id: 'bmt-g2', day_of_week: 2, start_time: '14:00', end_time: '15:30', room: '402', class_code: 'KET Thiếu nhi BMT', curriculum: 'KET for Schools', teacher_main: 'Ms. Vy', duration: 1.5, content: ['KET Listening Part 1', 'Pictures & descriptions', 'Dictation exercise'] },
      { id: 'bmt-sl4', group_id: 'bmt-g2', day_of_week: 4, start_time: '14:00', end_time: '15:30', room: '402', class_code: 'KET Thiếu nhi BMT', curriculum: 'KET for Schools', teacher_main: 'Ms. Vy', duration: 1.5, content: ['KET Reading Part 3', 'Multiple choice strategies', 'Timed practice'] },
      { id: 'bmt-sl5', group_id: 'bmt-g3', day_of_week: 2, start_time: '17:00', end_time: '18:30', room: '403', class_code: 'PET+ Thiếu niên', curriculum: 'PET Gold', teacher_main: 'Mr. Khoa', duration: 1.5, content: ['PET Writing Part 2', 'Story completion', 'Linking words review'] },
      { id: 'bmt-sl6', group_id: 'bmt-g3', day_of_week: 6, start_time: '09:00', end_time: '10:30', room: '403', class_code: 'PET+ Thiếu niên', curriculum: 'PET Gold', teacher_main: 'Mr. Khoa', duration: 1.5, content: ['Full mock PET test', 'Timed conditions', 'Answer review'] },
    ],
    homework: [
      { id: 'bmt-hw1', title: 'My Family drawing', description: 'Draw your family and write their names + relationship in English.', due_date: '2026-03-28', group_id: 'bmt-g1', teacher_id: 'bmt-t3', created_at: '2026-03-23T08:00:00Z' },
      { id: 'bmt-hw2', title: 'KET Listening Practice', description: 'Listen to tracks 12–15 on the CD and complete the exercises.', due_date: '2026-03-26', group_id: 'bmt-g2', teacher_id: 'bmt-t1', created_at: '2026-03-23T08:00:00Z' },
      { id: 'bmt-hw3', title: 'PET Story Writing', description: 'Write a 100-word story using: "She found a strange letter..."', due_date: '2026-03-25', group_id: 'bmt-g3', teacher_id: 'bmt-t2', created_at: '2026-03-23T08:00:00Z' },
      { id: 'bmt-hw4', title: 'Vocabulary revision', description: 'Revise all words from Units 1–3. Complete the crossword on page 24.', due_date: '2026-04-02', group_id: 'bmt-g2', teacher_id: 'bmt-t1', created_at: '2026-03-23T08:00:00Z' },
    ],
  },
}
