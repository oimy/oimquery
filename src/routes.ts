export interface RouteMilestone {
    name: string;
    path: string;
    color?: string;
}

export const routeMilestones: RouteMilestone[] = [
    {
        name: "Mysql",
        path: "/mysql",
        color: "orange",
    },
    {
        name: "Kotlin",
        path: "/kotlin",
        color: "purple",
    },
];
