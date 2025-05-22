import "../../styles/components/dashboard/ChefOrderList.css";

const ChefOrderList = () => {
  const chefs = [
    { name: "Manesh", orders: "03" },
    { name: "Pritam", orders: "07" },
    { name: "Yash", orders: "05" },
    { name: "Tenzen", orders: "08" },
  ];

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
          {chefs.map((chef, index) => (
            <tr key={index}>
              <td>{chef.name}</td>
              <td>{chef.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChefOrderList;
