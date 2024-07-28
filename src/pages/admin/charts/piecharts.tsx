import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { usePieQuery } from "../../../redux/api/dashboardAPI";
import { Skeleton } from "../../../components/Loader";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError } = usePieQuery(user?._id!);
  const pie = data?.charts!;

  if (isError) {
    toast.error("Caught error");
    return <Navigate to={"/admin/dashboard"} />
  }

  return (
    <div className="admin-container">
      {/* <AdminSidebar /> */}
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        {
          isLoading ? <Skeleton length={20} width="50vw" /> :
            (
              <>
                <section>
                  <div>
                    <div>
                    <h2>Order Fulfillment Ratio</h2>
                      <PieChart
                        labels={["Processing", "Shipped", "Delivered"]}
                        data={[pie?.orderFullfillment.processing, pie?.orderFullfillment.shipped, pie?.orderFullfillment.delivered]}
                        backgroundColor={[
                          `hsl(110,80%, 80%)`,
                          `hsl(110,80%, 50%)`,
                          `hsl(110,40%, 50%)`,
                        ]}
                        offset={[0, 0, 50]}
                      />
                    </div>


                    <div>
                    <h2>Product Categories Ratio</h2>

                      <DoughnutChart
                        labels={pie?.productCategories.map(
                          (i) => Object.keys(i)[0]
                        )}
                        data={
                          pie?.productCategories.map(
                            (i) => Object.values(i)[0]
                          )}
                        backgroundColor={pie.productCategories.map(
                          (i) => `hsl(${Object.values(i)[0] * Math.random() * 4}, ${Object.values(i)[0]}%, 50%)`
                        )}
                        legends={false}
                        offset={[0, 0, 0, 80]}
                      />
                    </div>

                  </div>

                </section>


                <section>
                  <div>
                    <div>
                    <h2> Stock Availability</h2>

                      <DoughnutChart
                        labels={["In Stock", "Out Of Stock"]}
                        data={[pie?.stockAvailablity.inStock, pie?.stockAvailablity.outOfStock]}
                        backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                        legends={false}
                        offset={[0, 80]}
                        cutout={"70%"}
                      />
                    </div>

                    <div>
                    <h2>Revenue Distribution</h2>

                      <DoughnutChart
                        labels={[
                          "Marketing Cost",
                          "Discount",
                          "Burnt",
                          "Production Cost",
                          "Net Margin",
                        ]}
                        data={[pie?.revenueDistribution.marketingCost,
                        pie?.revenueDistribution.discount,
                        pie?.revenueDistribution.burnt,
                        pie?.revenueDistribution.productionCost,
                        pie?.revenueDistribution.netMargin]}
                        backgroundColor={[
                          "hsl(110,80%,40%)",
                          "hsl(19,80%,40%)",
                          "hsl(69,80%,40%)",
                          "hsl(300,80%,40%)",
                          "rgb(53, 162, 255)",
                        ]}
                        legends={false}
                        offset={[20, 30, 20, 30, 80]}
                      />
                    </div>
                  </div>
                </section>


                <section>
                  <div>
                    <div>
                    <h2>Users Age Group</h2>

                      <PieChart
                        labels={[
                          "Teenager(Below 20)",
                          "Adult (20-40)",
                          "Older (above 40)",
                        ]}
                        data={[pie?.usersAgeGroup.teen, pie?.usersAgeGroup.adult, pie?.usersAgeGroup.old]}
                        backgroundColor={[
                          `hsl(10, ${80}%, 80%)`,
                          `hsl(10, ${80}%, 50%)`,
                          `hsl(10, ${40}%, 50%)`,
                        ]}
                        offset={[0, 0, 50]}
                      />
                    </div>
                    <div>
                    <h2>Admin Customer ratio </h2>

                      <DoughnutChart
                        labels={["Admin", "Customers"]}
                        data={[pie?.adminCustomer.admin, pie?.adminCustomer.customer]}
                        backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                        offset={[0, 50]}
                      />
                    </div>

                  </div>
                </section>

              </>
            )
        }
      </main>
      <AdminSidebar />

    </div>
  );
};

export default PieCharts;
