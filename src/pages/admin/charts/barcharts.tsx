import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { RootState } from "../../../redux/store";
import { useBarQuery } from "../../../redux/api/dashboardAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../../../components/Loader";
import { getLastMonths } from "../../../utils/features";
import { Navigate } from "react-router-dom";


const { lastSixMonths, lastTwelveMonths} = getLastMonths();

const Barcharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError } = useBarQuery(user?._id!);
  const bar = data?.charts!;

  if (isError) {
    toast.error("Caught error");
    return <Navigate to={"/admin/dashboard"} />
  }

  return (
    <div className="admin-container">
      {/* <AdminSidebar /> */}
      <main className="chart-container ">
        <h1>Bar Charts</h1>
        {
          isLoading ? <Skeleton length={20} width="50vw" /> :
            (
              <>
                <section >
                  {/* <div className="revenue-chart"> */}
                    <BarChart
                      data_2={bar.users}
                      data_1={bar.products}
                      title_1="Products"
                      title_2="Users"
                      bgColor_1={`hsl(260, 50%, 30%)`}
                      bgColor_2={`hsl(360, 90%, 90%)`}
                      labels={lastSixMonths}
                    />
                    <h2>Top Products & Top Customers</h2>
                  {/* </div> */}
                </section>

                <section>
                  <BarChart
                    horizontal={true}
                    data_1={bar.orders}
                    data_2={[]}
                    title_1="Orders"
                    title_2=""
                    bgColor_1={`hsl(180, 40%, 50%)`}
                    bgColor_2=""
                    labels={lastTwelveMonths}
                  />
                  <h2>Orders throughout the year</h2>
                </section>
              </>
            )
        }
      </main>
      <AdminSidebar />
    </div>
  );
};

export default Barcharts;
