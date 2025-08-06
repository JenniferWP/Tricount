import { useForm } from "react-hook-form";

const NewEvent = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="p-8 bg-gray-900 rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Créer un nouvel event
      </h1>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="grid grid-cols-2 gap-6"
      >
        <div className="col-span-2 flex flex-col">
          <label className="mb-2 text-gray-300 font-semibold">Titre</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2 row-span-12 flex flex-col">
          <label className="mb-2 text-gray-300 font-semibold">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            className="h-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-300 font-semibold">Date Start</label>
          <input
            {...register("dateStart", { required: true })}
            type="text"
            className="p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-300 font-semibold">Date End</label>
          <input
            {...register("dateEnd", { required: true })}
            type="text"
            className="p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow mt-4 transition-colors"
        >
          Créer l'event
        </button>
      </form>
    </div>
  );
};

export default NewEvent;
