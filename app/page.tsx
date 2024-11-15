import { fetchCars } from "@utils";
import { HomeProps } from "@types";
import { fuels, yearsOfProduction, vaihteisto, tyyppi, korimalli } from "@constants";
import { SearchBar, CustomFilter, Hero, WeDo, Pricing, CarGrid } from "@components";

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Etsi autoja joista pidät</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
            <CustomFilter title='vaihteisto' options={vaihteisto} />
            <CustomFilter title='tyyppi' options={tyyppi} />
            <CustomFilter title='korimalli' options={korimalli} />
          </div>
        </div>

        {/* Replace car section with a redirect component */}
        <CarGrid/>
      </div>

      <WeDo />
      <Pricing />
    </main>
  );
}