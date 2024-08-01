// import toast from "react-hot-toast";
import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import Table from "../../components/admin/DashboardTable";
import { useSelector } from "react-redux";
import { useStatsQuery } from "../../redux/api/dashboardAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/Loader";
import { useEffect } from "react";
import { getLastMonths } from "../../utils/features";

const { lastSixMonths} = getLastMonths();


const Dashboard = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useStatsQuery(user?._id!);

  const stats = data?.stats!;
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      {/* <AdminSidebar /> */}

      <main className="dashboard">
        {
          isLoading ? <Skeleton length={20} width="50vw" /> :
            (
              <>

                <section className="widget-container">
                  <WidgetItem
                    percent={stats.changePercent.revenue}
                    amount={true}
                    value={stats.count.revenue}
                    heading="Revenue"
                    color="rgb(0, 115, 255)"
                  />
                  <WidgetItem
                    percent={stats.changePercent.user}
                    value={stats.count.user}
                    color="rgb(0 198 202)"
                    heading="Users"
                  />
                  <WidgetItem
                    percent={stats.changePercent.order}
                    value={stats.count.order}
                    color="rgb(255 196 0)"
                    heading="Transactions"
                  />

                  <WidgetItem
                    percent={stats.changePercent.product}
                    value={stats.count.product}
                    color="rgb(100 200 65)"
                    heading="Products"
                  />
                </section>

                <section className="graph-container">
                  <div className="revenue-chart">
                    <h2>Revenue & Transaction</h2>
                    <BarChart
                      data_1={stats.chart.order}
                      data_2={stats.chart.revenue}
                      title_1="Revenue"
                      title_2="Transaction"
                      bgColor_1="rgb(0, 115, 255)"
                      bgColor_2="rgba(53, 162, 235, 0.8)"
                      labels={lastSixMonths}
                    />
                  </div>

                  <div className="dashboard-categories">
                    <h2>Inventory</h2>

                    <div>
                      {stats.categoryCount.map((i, index) => {

                        const [heading, value] = Object.entries(i)[0];
                        return (
                          <CategoryItem
                            key={heading}
                            value={value}
                            heading={heading}
                            color={`hsl(${value * 4}, ${value}%, 50%)`}
                          />
                        )
                      })}
                    </div>
                  </div>
                </section>

                <section className="transaction-container">
                  <div className="gender-chart">
                    <h2>Gender Ratio</h2>
                    <DoughnutChart
                      labels={["Female", "Male"]}
                      data={[stats.userRatio.female, stats.userRatio.male]}
                      backgroundColor={[
                        "hsl(340, 82%, 56%)",
                        "rgba(53, 162, 235, 0.8)",
                      ]}
                      cutout={90}
                    />
                    <p>
                      <BiMaleFemale />
                    </p>
                  </div>
                  <Table data={stats.latestTransaction} />
                </section>
              </>
            )
        }
      </main>
      <AdminSidebar />

    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{amount ? `₹${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{percent}%{" "}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%{" "}
        </span>
      )}
    </div>

    <div
      className="widget-circle"
      style={{
        background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span
        style={{
          color,
        }}
      >
        {percent > 0 && `${percent > 10000 ? 9999 : percent}`}
        {percent < 0 && `${percent < -10000 ? -9999 : percent}`}%
      </span>
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="category-item">
    <span>{value}%</span>
    <div>
      <div
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      >

      </div>
    </div>
    <h5>{heading}</h5>

  </div>
);

export default Dashboard;
