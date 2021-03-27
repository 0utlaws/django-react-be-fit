import React from "react";
import { Route } from "react-router";
import Panel from "../components/Panel";
import ProductList from "../components/ProductList";
import DiaryList from "../components/DiaryList";
import DiaryPage from "../components/DiaryPage";


const Page = () => {
    return (
        <>
            <Route path="/panel" exact component={Panel} />
            <Route path="/products" component={ProductList} />
            <Route path="/diarys" component={DiaryList} />
            <Route path="/diary/:id" component={DiaryPage} />
        </>
    )
}

export default Page;