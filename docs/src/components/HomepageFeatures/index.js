/* eslint-disable space-before-function-paren */
import Translate from "@docusaurus/Translate";
import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: <Translate>HOME.REASON_1_TITLE</Translate>,
    Svg: require("@site/static/img/power.svg").default,
    description: <Translate>HOME.REASON_1_DESCRIPTION</Translate>,
  },
  {
    title: <Translate>HOME.REASON_2_TITLE</Translate>,
    Svg: require("@site/static/img/building-a-diamond-website.svg").default,
    description: <Translate>HOME.REASON_2_DESCRIPTION</Translate>,
  },
  {
    title: <Translate>HOME.REASON_3_TITLE</Translate>,
    Svg: require("@site/static/img/ui.svg").default,
    description: <Translate>HOME.REASON_3_DESCRIPTION</Translate>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className={`${styles.textCenter} text--center`}>
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
