export const Status = {
  PENDING: "pending",
  COMPLETED: "completed",
};

export const MODALS = {
  taskform: "task-form",
  taskModal: "task-modal",
  newSpaceModal: "new-space-modal",
  joinSpaceModal: "join-space-modal"
};

export enum STATE {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed'
}

export const TASKS = [
  { id: "all", title: "All" },
  { id: "pending", title: "Pending" },
  { id: "completed", title: "Completed" },
];