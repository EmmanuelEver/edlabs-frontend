export type ROLES = "STUDENT" | "TEACHER" | "ADMIN";

export interface User {
    readonly id?: string;
    name: string
    firstname?: string;
    lastname?: string;
    profileUrl: string
    email: string;
    role: ROLES
    createdAt?: string;
}

export interface IActivitySummary {
    readonly id: string;
    title: string;
    closeDate: string;
    createdAt: string;
    shortDescription: string;
    sessions: any[]; 
}

export interface IActivityFull {
    readonly id: string;
    title: string;
    closeDate: string;
    openDate: string;
    submitCount: number;
    createdAt: string;
    starterCode: string;
    lastUpdated: string;
    shortDescription: string;
    description: string;
    isOnline: boolean;
    section: IActivitesBySection;
    lang: "c" | "python"

}

export interface IActivitesBySection {
    title: string;
    readonly id: string;
    shortcode: string;
    activities: any;
  }
  

export interface ISection {
    id: string;
    title: string;
    shortcode: string;
    createdBy: string;
    activities: IActivitySummary[];
    submittedActivities: number;
    isOnline: boolean; 
    teacher?: any
}

export interface IStudent {
    readonly id: string;
    profileUrl: string;
    name: string;
    user?: any;
    status?: string;
    email: string;
    studentId: string;
}

export interface ITeacherSection {
    id: string;
    title: string;
    shortcode: string;
    createdBy: string;
    createdAt: string;
    lastUpdated: string;
    activities: any[];
    students: IStudent[];
    isOnline: boolean; 
    accessCode: string;
    pendingStudents: IStudent[];
    blockedStudents: IStudent[];
}