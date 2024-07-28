import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { RootState } from "../../../redux/store";
import { useLineQuery } from "../../../redux/api/dashboardAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../../../components/Loader";
import { getLastMonths } from "../../../utils/features";
import { Navigate } from "react-router-dom";

const { lastTwelveMonths } = getLastMonths();

const Linecharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError } = useLineQuery(user?._id!);
  const line = data?.charts!;

  if (isError) {
    toast.error("Caught error");
    return <Navigate to={"/admin/dashboard"} />
  }

  return (
    <div className="admin-container">
      {/* <AdminSidebar /> */}
      <main className="chart-container">
        <h1>Line Charts</h1>
        {isLoading ? (
          <Skeleton length={20} width="50vw" />
        ) : (
          <>
            <section>
                    <LineChart
                    data={line.users}
                    label="Users"
                    borderColor="rgb(53, 162, 255)"
                    labels={lastTwelveMonths}
                    backgroundColor="rgba(53, 162, 255, 0.5)"
                  />
                  <h2>Active Users</h2>
             
            </section>

            <section>
              <LineChart
                data={line.products}
                backgroundColor={"hsla(269,80%,40%,0.4)"}
                borderColor={"hsl(269,80%,40%)"}
                labels={lastTwelveMonths}
                label="Products"
              />
              <h2>Total Products (SKU)</h2>
            </section>

            <section>
              <LineChart
                data={line.revenue}
                backgroundColor={"hsla(129,80%,40%,0.4)"}
                borderColor={"hsl(129,80%,40%)"}
                label="Revenue"
                labels={lastTwelveMonths}
              />
              <h2>Total Revenue </h2>
            </section>

            <section>
              <LineChart
                data={line.discount}
                backgroundColor={"hsla(29,80%,40%,0.4)"}
                borderColor={"hsl(29,80%,40%)"}
                label="Discount"
                labels={lastTwelveMonths}
              />
              <h2>Discount Allotted </h2>
            </section>
          </>
        )}
      </main>
      <AdminSidebar />

    </div>
  );
};

export default Linecharts;
