import React from "react";
import CardSimple from "./Card.Simple";
import CardStatistic from "./Card.Statistic";

export default function Card(props) {
  const { type } = props;
  if (type == "statistic") return <CardStatistic {...props} />;
  if (type == "simple") return <CardSimple {...props} />;
  return <></>;
}
