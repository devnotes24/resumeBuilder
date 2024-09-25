import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getResumeData, updateResumeData } from "../services/resumeDataAPi";
import toast from "react-hot-toast";

export function useResumeData(email) {
  const queryClient = useQueryClient();

  // Fetching Resume data
  const queryKey = ['resumeData'];
  const queryFn = () => getResumeData(email);
  const { data: resumeData, isLoading: isFetching, isError: isFetchingError, error: fetchError } = useQuery({
    queryKey,
    queryFn,
  });


//   // Mutation for updating a Resume data
  const updateMutation = useMutation({
    mutationFn: ([email , data]) => updateResumeData(email , data),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);

      toast.success("Data updated successfully");
    },
    onError: (error) => {
      console.error('Error in updating Resume data:', error.response?.data || error.message);
      toast.error("Error in updating data");
    },
  });


          
  return { 
    resumeData, 
    isFetching, 
    isFetchingError, 
    fetchError,
    updateResumeData : updateMutation.mutateAsync,
    isUpdating : updateMutation.isPending,
  };
}
