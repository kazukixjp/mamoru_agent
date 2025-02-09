"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, Clock, ChevronRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import type { Task, TaskStatus, TaskProgress } from "../types/task"

interface TaskChecklistProps {
  tasks: string[]
  onTaskUpdate?: (tasks: Task[]) => void
}

export function TaskChecklist({ tasks, onTaskUpdate }: TaskChecklistProps) {
  const [taskList, setTaskList] = useState<Task[]>(
    tasks.map((task, index) => ({
      id: `task-${index}`,
      content: task,
      status: "PENDING" as TaskStatus,
    })),
  )

  const progress: TaskProgress = taskList.reduce(
    (acc, task) => {
      acc.total++
      switch (task.status) {
        case "COMPLETED":
          acc.completed++
          break
        case "NEEDED":
          acc.needed++
          break
        case "NOT_NEEDED":
          acc.notNeeded++
          break
        case "PENDING":
          acc.pending++
          break
      }
      return acc
    },
    { total: 0, completed: 0, needed: 0, notNeeded: 0, pending: 0 },
  )

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    const updatedTasks = taskList.map((task) => (task.id === taskId ? { ...task, status } : task))
    setTaskList(updatedTasks)
    onTaskUpdate?.(updatedTasks)
  }

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "COMPLETED":
        return <Check className="h-4 w-4 text-green-500" />
      case "NEEDED":
        return <ChevronRight className="h-4 w-4 text-blue-500" />
      case "NOT_NEEDED":
        return <X className="h-4 w-4 text-gray-500" />
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500"
      case "NEEDED":
        return "bg-blue-500"
      case "NOT_NEEDED":
        return "bg-gray-500"
      case "PENDING":
        return "bg-yellow-500"
      default:
        return "bg-gray-200"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">問題解決のためのステップ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>進捗状況</span>
            <span>
              {progress.completed + progress.notNeeded}/{progress.total} 完了
            </span>
          </div>
          <Progress value={((progress.completed + progress.notNeeded) / progress.total) * 100} className="h-2" />
          <div className="flex justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>必要: {progress.needed}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-gray-500" />
              <span>不要: {progress.notNeeded}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>保留: {progress.pending}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {taskList.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group relative rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 h-2 w-2 rounded-full ${getStatusColor(task.status)}`} />
                  <div className="space-y-1">
                    <p className="text-sm">{task.content}</p>
                    {task.status === "NEEDED" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        <span>このステップは重要です</span>
                      </motion.div>
                    )}
                  </div>
                </div>
                <Select value={task.status} onValueChange={(value: TaskStatus) => handleStatusChange(task.id, value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <span>
                          {task.status === "COMPLETED"
                            ? "完了"
                            : task.status === "NEEDED"
                              ? "必要"
                              : task.status === "NOT_NEEDED"
                                ? "不要"
                                : "保留"}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEEDED">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-blue-500" />
                        必要
                      </div>
                    </SelectItem>
                    <SelectItem value="NOT_NEEDED">
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-gray-500" />
                        不要
                      </div>
                    </SelectItem>
                    <SelectItem value="PENDING">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        保留
                      </div>
                    </SelectItem>
                    <SelectItem value="COMPLETED">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        完了
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          ))}
        </div>

        {progress.completed + progress.notNeeded === progress.total && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg bg-green-500/10 p-4 text-center text-sm text-green-600"
          >
            <Check className="mx-auto mb-2 h-5 w-5" />
            すべてのステップが完了しました！
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

