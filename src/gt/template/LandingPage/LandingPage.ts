import styled from "styled-components";
import { flex } from "../../../utils";

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
  gap: 2rem;
  padding: 2rem 0;
  background: var(--primary-0_2);
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
  ${flex.alignCenter};
  flex-direction: column;
`;

const LandingPageFeaturesLeft = styled(LandingPageFeaturesRight)``;

const LandingPageFooterWrapper = styled(LandingPageFeaturesWrapper)`
  padding-top: 3rem;
  background: var(--secondary-0_5);
`;

const LandingPageFooterContent = styled(LandingPageFeaturesContent)``;

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
  Footer: {
    Wrapper: LandingPageFooterWrapper,
    Content: LandingPageFooterContent,
  },
};

export default LandingPage;
