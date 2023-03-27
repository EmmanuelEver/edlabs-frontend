export type ROLES = "DEFAULT" | "STUDENT" | "TEACHER" | "ADMIN";

export interface IActivitySummary {
    activity_name: string;
    due_date: string;
    readonly internal_id: string;
}