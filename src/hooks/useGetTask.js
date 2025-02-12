import { useQuery } from "@tanstack/react-query";
import { getTaskApi } from "../api/apiService";

export function useGetTasks() {
 
  const { isPending: isLoading, data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTaskApi,
  });

  return { tasks, isLoading };
}
