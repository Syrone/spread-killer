import Header from "./components/Header/Header"
import Hero from "./components/Hero/Hero"
import Filters from "./components/Filters/Filters"
import PageBackground from "./components/PageBackground/PageBackground"

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Filters />
      </main>

      <PageBackground />
    </>
  )
}
