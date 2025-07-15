import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 

export interface User {
    userId?: number ;
    username : string;
    email : string;
    profilePictureUrl?: string;
    cognitoId?:string;
    teamId?:number;
}

export enum Status {
    ToDo = "To Do",
    workInProject = "work In Progress",
    underReview = "under Review",
    completed = "completed"
}

export enum Priority {
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "BackLog"
}


export interface Attachments {
    id: number;
    fileURL?: string;
    fileName?:string;
    taskId?:number;
    uploadById?:number;
}
export interface Project {
    id: number;
    name: string;
    description?:string;
    startDate?: string;
    endDate?:string;
}

export interface Task {
    id: number;
    title: string;
    description?:string;
    dueDate?:string;
    status?:Status;
    priority?:Priority;
    tags?:string;
    startDate?: string  ;
    endDate?:string  ;
    points?:number;
    projectId?:number;
    authorUserId?:number;
    assignedUserId?:number;

    author?: User;
    assignee?:User;
    comments?:Comment[],
    attachments?: Attachments[]
}

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}

export interface Team {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
}

 
export const api = createApi({
    baseQuery : fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
}),
reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
endpoints: (build) => ({
    getProjects:build.query<Project[], void>({
        query: () => "projects",
        providesTags: ["Projects"] 
    }),
    // this will create some projects
    createProject:build.mutation<Project, Partial<Project>>({
        query:(project)=>({
            url: "Projects",
            method:"POST",
            body:project
        }),
        invalidatesTags:["Projects"]
    }),
      getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),
    getTasksByUser: build.query<Task[], number>({
      query: (userId) => `tasks/user/${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks", id }))
          : [{ type: "Tasks", id: userId }],
    }),
      createTasks:build.mutation<Task, Partial<Task>>({
        query:(task)=>({
            url: "tasks", 
            method:"POST",
            body:task 
        }),
        invalidatesTags:["Tasks"]
    }),
    // when we update task we are updating a specific task 
    // when usin task only one 
     updateTaskStatus:build.mutation<Task,  {taskId:number; status:string}>({
        query:({taskId,status})=>({
            url: `tasks/${taskId}/status`,
            method:"PATCH",
            body:{status}
        }),
        invalidatesTags:(result,error,{taskId})=>[
            {type: "Tasks",id:taskId}
        ]
    }),
     getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
     search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
    }),
}),
});

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useGetTasksQuery,
    useCreateTasksMutation,
    useUpdateTaskStatusMutation,
    useSearchQuery,
    useGetUsersQuery,
    useGetTeamsQuery,
    useGetTasksByUserQuery,
 } = api;

