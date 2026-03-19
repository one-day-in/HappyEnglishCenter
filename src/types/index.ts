export type Role = 'student' | 'teacher' | 'admin'

export interface Profile {
  id: string
  full_name: string
  role: Role
  email?: string
}

export interface Group {
  id: string
  name: string
  level: string
  teacher_id: string
  teacher?: Profile
}

export interface GroupMember {
  id: string
  group_id: string
  student_id: string
  student?: Profile
}

export interface ScheduleSlot {
  id: string
  group_id: string
  day_of_week: number // 1=Mon, 7=Sun
  start_time: string  // "15:00"
  end_time: string    // "16:30"
  room?: string
  group?: Group
  // Rich lesson fields
  class_code?: string
  curriculum?: string
  teacher_main?: string
  teacher_assistant?: string
  duration?: number   // hours, e.g. 1.25
  content?: string[]
}

export interface Homework {
  id: string
  group_id: string
  teacher_id: string
  title: string
  description?: string
  due_date?: string
  created_at: string
  group?: Group
}

export interface HomeworkCompletion {
  id: string
  homework_id: string
  student_id: string
  completed_at: string
}
