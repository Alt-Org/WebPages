import { useDeleteProfileMutation } from "@/entities/Clan";
import { useState } from "react";
import { toast } from "react-toastify";

const useDeleteProfile = () => {
   const [deleteClan] = useDeleteProfileMutation();
   const [isCancelled, setIsCancelled] = useState(false);
   const handleDelete = async (onSuccess?: () => void) => {
      if (confirm("Oletko varma?")) {
         try {
            await deleteClan().unwrap(); // Call the mutation without arguments
            toast.success('Profiili poistettiin onnistuneesti');
            if (onSuccess) onSuccess();
            setIsCancelled(false);
         } catch (error) {
            toast.error(`Virhe poistettaessa profiilia: ${error}`);
            setIsCancelled(true);
         }
      } else {
         toast.info('Poisto peruutettiin', { autoClose: 1500 });
         setIsCancelled(true);
      }
   };

   return { isCancelled, handleDelete };
};

export default useDeleteProfile;