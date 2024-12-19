import SPBarChart from "./SPBarChart";
import APChart from "./AProgressChart";
function ASPC() {
    return ( 
        <section className="  grid  grid-cols-1   md:grid-cols-[2fr_1fr] sm:grid-cols-1 gap-4 mt-2 mx-6 "> 
        <SPBarChart />
        <APChart />
        </section>
      );
}

export default ASPC;