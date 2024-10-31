import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <main className='mw-full max-w-[1180px] mx-auto min-h-[calc(100dvh_+_50px)]'>
        <h1 className='text-4xl text-center bold m-[50px_20px]'>Category management app</h1>
        <section className='mt-4'>
          <CategoryForm />
        </section>
        <section className='mt-4 mb-20'>
          <CategoryList />
        </section>
      </main>
    </>
  );
};

export default App;