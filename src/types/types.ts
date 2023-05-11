export type ROLES = "DEFAULT" | "STUDENT" | "TEACHER" | "ADMIN";

export interface IActivitySummary {
    activity_name: string;
    due_date: string;
    readonly internal_id: string;
}

export interface IActivitesBySection {
    section: string;
    readonly internal_id: string;
    activites: IActivitySummary[]
  }

export interface ISection {
    internal_id: string;
    sectionName: string;
    sectionCode: string;
    sectionInstructor: string;
    totalActivities: number;
    submittedActivities: number;
    isActive: boolean; 
}

export interface IStudent {
    avatar: string;
    username: string;
}

export interface ITeacherSection {
    internal_id: string;
    sectionName: string;
    sectionCode: string;
    sectionInstructor: string;
    totalActivities: number;
    totalStudents: number;
    studentsInfo: IStudent[];
    isActive: boolean; 
}