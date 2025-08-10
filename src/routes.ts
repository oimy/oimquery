export interface RouteMilestone {
    name: string;
    path: string;
    color?: string;
    logo: string;
}

export const routeMilestones: RouteMilestone[] = [
    {
        name: "Mysql",
        path: "/mysql",
        color: "navy",
        logo: "/logos/mysql-logo.svg",
    },
    {
        name: "Kotlin",
        path: "/kotlin",
        color: "purple",
        logo: "/logos/kotlin-logo.svg",
    },
];
