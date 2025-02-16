import { useForm } from 'react-hook-form';

const SearchForm = () => {
  const { handleSubmit, control, register } = useForm();

  const onSubmit = (data) => {
    console.log('dataform ' + JSON.stringify(data));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Media Type</label>
        <br />
        <input type="radio" {...register('mediaType')} value="movie" />
        <label>Movie</label>
        <br />
        <input type="radio" {...register('mediaType')} value="tv" />
        <label>TV Show</label>
        <br />

        <label>Name</label>
        <input type="text" {...register('name')} />

        <input type="submit"></input>
      </form>
    </div>
  );
};
export default SearchForm;
