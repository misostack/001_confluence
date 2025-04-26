import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "App Store Guidelines",
    imageSrc: require("@site/static/img/app-store-guideline.png").default,
    description: (
      <>Building the app is easy. Surviving the review is the real challenge.</>
    ),
  },
  {
    title: "Technical debts",
    imageSrc: require("@site/static/img/technical-debt.jpg").default,
    description: (
      <>
        You either fix technical debt early, or live long enough to call for a
        full rewrite
        <br />
        <em style={{ fontSize: "0.8rem" }}>
          - You Either Die A Hero, Or You Live Long Enough To See Yourself
          Become The Villain.
        </em>
      </>
    ),
  },
  {
    title: 'Clients requesting "small changes"',
    imageSrc: require("@site/static/img/client-request-small-changes.jpg")
      .default,
    description: <>Just a small change... that breaks the whole page.</>,
  },
];

function Feature({ imageSrc, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img style={{ height: 280 }} src={imageSrc} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
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
