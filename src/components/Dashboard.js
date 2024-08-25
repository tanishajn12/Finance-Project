
import React, { useEffect, useState } from "react";
import { Card, Row } from "antd";
import { Line, Pie } from "@ant-design/charts";
import moment from "moment";
import TransactionSearch from "./TransactionSearch";
import Header from "./Header";
import AddIncomeModal from "./Modals/AddIncome";
import AddExpenseModal from "./Modals/AddExpense";
import AddSavingModal from "./Modals/AddSaving";
import Cards from "./Cards";
import NoTransactions from "./NoTransactions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { unparse } from "papaparse";
import "./dashboard.css";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isSavingModalVisible, setIsSavingModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag || "saving", // Default tag for savings
      name: values.name,
    };

    setTransactions([...transactions, newTransaction]);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
    setIsSavingModalVisible(false); // Close saving modal

    addTransaction(newTransaction);
    calculateBalance();
  };

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;
    let savingsTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else if (transaction.type === "expense") {
        expensesTotal += transaction.amount;
      } else if (transaction.type === "saving") {
        savingsTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setSavings(savingsTotal);
    setCurrentBalance(incomeTotal - expensesTotal - savingsTotal);
  };

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const showSavingModal = () => {
    setIsSavingModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const handleSavingCancel = () => {
    setIsSavingModalVisible(false);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if (!many) {
        toast.success("Transaction Added!");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      if (!many) {
        toast.error("Couldn't add transaction");
      }
    }
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  // const balanceData = transactions.reduce((acc, transaction) => {
  //   const monthYear = moment(transaction.date).format("MMM YYYY");
  //   const index = acc.findIndex((data) => data.month === monthYear);
  //   if (index !== -1) {
  //     acc[index].balance += transaction.type === "income" ? transaction.amount : -transaction.amount;
  //   } else {
  //     acc.push({
  //       month: monthYear,
  //       balance: transaction.type === "income" ? transaction.amount : -transaction.amount,
  //     });
  //   }
  //   return acc;
  // }, []);

  // to show the currentBalance everymonth

  
  
  const balanceData = transactions.reduce((acc, transaction) => {
    const monthYear = moment(transaction.date).format("MMM YYYY");
    const index = acc.findIndex((data) => data.month === monthYear);
  
    // Calculate the previous total balance, or start with 0 if it's the first entry
    let previousTotalBalance = acc.length > 0 ? acc[acc.length - 1].totalBalance : 0;
    if (index !== -1) {
      // If the month already exists in the array, update its income, expense, and total balance
      if (transaction.type === "income") {
        acc[index].income += transaction.amount;
        acc[index].totalBalance+=acc[index].income;
      } else {
        acc[index].expense += transaction.amount;
        acc[index].totalBalance -=acc[index].expense;
      }
      // Update total balance for the current month
      acc[index].totalBalance = previousTotalBalance;
    } else {
      // If the month doesn't exist, create a new entry with the current total balance
      const income = transaction.type === "income" ? transaction.amount : 0;
      const expense = transaction.type === "expense" ? transaction.amount : 0;
      acc.push({
        month: monthYear,
        income: income,
        expense: expense,
        totalBalance: previousTotalBalance + income - expense,
      });
    }
  
    return acc;
  }, []);
  
  // console.log(balanceData);
  

  

  const transformedData = balanceData.flatMap(item => [
    // { month: item.month, type: "Balance", value: item.totalBalance},
    { month: item.month, type: "Income", value: item.income },
    { month: item.month, type: "Expense", value: item.expense },
  ]);
  

  const spendingDataArray = Object.entries(
    transactions.reduce((acc, transaction) => {
      if (transaction.type === "expense") {
        acc[transaction.tag] = (acc[transaction.tag] || 0) + transaction.amount;
      }
      return acc;
    }, {})
  ).map(([category, value]) => ({ category, value }));

  // const balanceConfig = {
  //   data: balanceData,
  //   xField: "month",
  //   yField: "balance",
  // };

  const balanceConfig = {
    data: transformedData,
    xField: "month",
    yField: "value",        // This is the field where the metric values are stored
    seriesField: "type",    // This distinguishes between "Balance", "Income", "Expense"
    // Optional: Customize colors, tooltip, legend, etc.
    color: ["#82ca9d", "#8884d8", "#ff7300"], // Example colors for Balance, Income, Expense
  };
  

  const spendingConfig = {
    data: spendingDataArray,
    angleField: "value",
    colorField: "category",
  };

  function reset() {
    console.log("resetting");
  }

  const cardStyle = {
    boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
    margin: "2rem 1rem",
    borderRadius: "0.5rem",
    // minWidth: "350px",
    flex: 1,
  };

  function exportToCsv() {
    const csv = unparse(transactions, {
      fields: ["name", "type", "date", "amount", "tag"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="dashboard-container">
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Cards
            currentBalance={currentBalance}
            income={income}
            expenses={expenses}
            savings={savings}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            showSavingModal={showSavingModal}
            cardStyle={cardStyle}
            reset={reset}
          />

          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <AddSavingModal
            isSavingModalVisible={isSavingModalVisible}
            handleSavingCancel={handleSavingCancel}
            onFinish={onFinish}
          />
          {transactions.length === 0 ? (
            <NoTransactions />
          ) : (
            <>
              <Row gutter={16}>
                <Card bordered={true} style={cardStyle}>
                  <h2>Financial Statistics</h2>
                  <Line {...balanceConfig} />
                </Card>

                <Card bordered={true} style={{ ...cardStyle, flex: 0.45 }}>
                  <h2>Total Spending</h2>
                  {spendingDataArray.length === 0 ? (
                    <p>Seems like you haven't spent anything till now...</p>
                  ) : (
                    <Pie {...spendingConfig} />
                  )}
                </Card>
              </Row>
            </>
          )}
          <TransactionSearch
            transactions={transactions}
            exportToCsv={exportToCsv}
            fetchTransactions={fetchTransactions}
            addTransaction={addTransaction}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
