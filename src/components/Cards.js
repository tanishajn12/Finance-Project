// // import React from "react";
// // import { Card, Row } from "antd";

// // function Cards({
// //   currentBalance,
// //   income,
// //   expenses,
// //   showExpenseModal,
// //   showIncomeModal,
// //   cardStyle,
// //   reset,
// // }) {
// //   return (
// //     <Row
// //       style={{
// //         display: "flex",
// //         flexWrap: "wrap",
// //         gap: "16px",
// //         justifyContent: "space-between",
// //       }}
// //     >
// //       <Card bordered={true} style={cardStyle}>
// //         <h2>Current Balance</h2>
// //         <p>₹{currentBalance}</p>
// //         <div class="btn btn-blue" style={{ margin: 0 }} onClick={reset}>
// //           Reset Balance
// //         </div>
// //       </Card>

// //       <Card bordered={true} style={cardStyle}>
// //         <h2>Total Income</h2>
// //         <p>₹{income}</p>
// //         <div
// //           class="btn btn-blue"
// //           style={{ margin: 0 }}
// //           onClick={showIncomeModal}
// //         >
// //           Add Income
// //         </div>
// //       </Card>

// //       <Card bordered={true} style={cardStyle}>
// //         <h2>Total Expenses</h2>
// //         <p>₹{expenses}</p>
// //         <div className="btn btn-blue" onClick={showExpenseModal}>
// //           Add Expense
// //         </div>
// //       </Card>
// //     </Row>
// //   );
// // }

// // export default Cards;




import React from "react";
import { Card, Row, Col } from "antd";
import {
  DollarCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ReloadOutlined,
  BankOutlined,
} from "@ant-design/icons";
import './cards.css';


function Cards({
  currentBalance,
  income,
  expenses,
  savings,
  showExpenseModal,
  showIncomeModal,
  showSavingModal,
  cardStyle,
  reset,
}) {
  const cardItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "3px",
    borderRadius: "10px",
  
  };

  const iconStyle = {
    fontSize: "1.6rem",
    marginLeft:"1rem",
    marginRight: "1rem",
    marginBottom:"2.5rem",
    color: "#1890ff",
  };

  const amountStyle = {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: 0,
    alignItems:"center",
  };

  const titleStyle = {
    fontSize: "1.3rem",
    fontWeight: "600",
    alignItems:"center",
    marginBottom: "5px",
  };

  const buttonStyle = {
    padding: "8px 65px",
    paddingRight:"75px",
    borderRadius:"5px",
    alignItems:"center",
    backgroundColor: "#1890ff",
    color: "#fff",
    fontWeight: "500",
    cursor: "pointer",
    textAlign: "center",
    marginTop: "10px",
    width:"100%",
    
  };
  const buttonStyle2 = {
    marginRight:"10px",
    padding: "8px 70px",
    paddingRight:"80px",
    borderRadius:"5px",
    alignItems:"center",
    backgroundColor: "#1890ff",
    color: "#fff",
    fontWeight: "500",
    cursor: "pointer",
    textAlign: "center",
    marginTop: "10px",
    width:"100%",
    
  };

  return (
    <Row
      gutter={[16, 16]}
      style={{
        display: "flex",
        justifyContent: "space-between",
        
      }}
    >
      <Col xs={24} md={6}>
        <Card bordered={true} style={{ ...cardStyle, ...cardItemStyle }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DollarCircleOutlined style={iconStyle} />
            <div>
              <h2 style={titleStyle}>Current Balance</h2>
              <p style={amountStyle}>₹{currentBalance}</p>
            </div>
          </div>
          <div style={buttonStyle} onClick={reset}>
            <ReloadOutlined /> Reset Balance
          </div>
        </Card>
      </Col>

       <Col xs={24} md={6}>
        <Card bordered={true} style={{ ...cardStyle, ...cardItemStyle }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ArrowUpOutlined style={{ ...iconStyle, color: "#52c41a" }} />
            <div>
              <h2 style={titleStyle}>Total Income</h2>
              <p style={amountStyle}>₹{income}</p>
            </div>
          </div>
          <div style={buttonStyle2} onClick={showIncomeModal}>
            <ArrowUpOutlined /> Add Income
          </div>
        </Card>
      </Col>

      <Col xs={24} md={6}>
        <Card bordered={true} style={{ ...cardStyle, ...cardItemStyle }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ArrowDownOutlined style={{ ...iconStyle, color: "#f5222d" }} />
            <div>
              <h2 style={titleStyle}>Total Expenses</h2>
              <p style={amountStyle}>₹{expenses}</p>
            </div>
          </div>
          <div style={buttonStyle} onClick={showExpenseModal}>
            <ArrowDownOutlined /> Add Expense
          </div>
        </Card>
      </Col>

      <Col xs={24} md={6}>
        <Card bordered={true} style={{ ...cardStyle, ...cardItemStyle }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <BankOutlined style={{ ...iconStyle, color: "#faad14" }} />
            <div>
              <h2 style={titleStyle}>Total Savings</h2>
              <p style={amountStyle}>₹{savings}</p>
            </div>
          </div>
          <div style={buttonStyle2} onClick={showSavingModal}>
            <BankOutlined /> Add Saving
          </div>
        </Card> 
      </Col>
    </Row>
  );
}

export default Cards;



