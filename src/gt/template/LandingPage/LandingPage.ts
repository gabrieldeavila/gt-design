import styled from "styled-components";

const LandingPageWrapper = styled.div``;

const LandingPageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  height: 20rem;

  /* linear background */
  background: linear-gradient(
    180deg,
    var(--primary-0_1) 0%,
    var(--primary-0_5) 100%
  );
`;

const LandingPageBenefitsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background: linear-gradient(
    150deg,
    var(--secondary-0_1) 0%,
    var(--secondary-0_5) 100%
  );
`;

const LandingPageBenefitsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1248px;
  gap: 2rem;
`;

const LandingPageFeaturesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandingPageFeaturesContent = styled.div`
  display: flex;
  flex-direction: row;
  width: -webkit-fill-available;
  max-width: 1248px;
  gap: 2rem;
`;

const LandingPageFeaturesRight = styled.div`
  width: 50%;
  background: red
`;

const LandingPageFeaturesLeft = styled.div`
  width: 50%;
  background: blue
`;

const LandingPage = {
  Wrapper: LandingPageWrapper,
  Header: LandingPageHeader,
  Benefits: {
    Wrapper: LandingPageBenefitsWrapper,
    Content: LandingPageBenefitsContent,
  },
  Features: {
    Wrapper: LandingPageFeaturesWrapper,
    Content: LandingPageFeaturesContent,
    Left: LandingPageFeaturesLeft,
    Right: LandingPageFeaturesRight,
  },
};

export default LandingPage;
