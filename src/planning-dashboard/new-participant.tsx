import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

const NewParticipant = () => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams({ from: "/planning/$id" });

  const mutation = useMutation({
    mutationFn: (data) => {
      return fetch(`http://localhost:3000/planning/${id}/add-user`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    },
  });

  const sendForm = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div className="p-8 bg-gray-900 rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Ajouter un nouveau participant
      </h1>
      <form
        onSubmit={handleSubmit((data) => sendForm(data))}
        className="grid grid-cols-2 gap-6"
      >
        <div className="col-span-2 flex flex-col">
          <label className="mb-2 text-gray-300 font-semibold">
            Adresse email
          </label>
          <input
            {...register("email", { required: true })}
            type="text"
            className="p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow mt-4 transition-colors"
        >
          Ajouter le participant
        </button>
      </form>
    </div>
  );
};

export default NewParticipant;
