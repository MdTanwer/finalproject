import { useEffect } from "react";
import { useApi } from "../../context/ApiContext";
import "../../styles/components/dashboard/ChefOrderList.css";

const ChefOrderList = () => {
  const { chefs, chefsLoading, chefsError, getChefs } = useApi();

  useEffect(() => {
    getChefs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="chef-order-list">
      <table className="chef-table">
        <thead>
          <tr>
            <th>Chef Name</th>
            <th>Order Taken</th>
          </tr>
        </thead>
        <tbody>
          {chefsLoading && (
            <tr>
              <td colSpan={2}>Loading...</td>
            </tr>
          )}
          {chefsError && (
            <tr>
              <td colSpan={2} style={{ color: "red" }}>
                {chefsError}
              </td>
            </tr>
          )}
          {!chefsLoading &&
            !chefsError &&
            chefs.map((chef) => (
              <tr key={chef._id}>
                <td>{chef.name}</td>
                <td>{chef.orderTaken}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChefOrderList;
