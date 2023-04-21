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
  background: linear-gradient(150deg, var(--secondary-0_1) 0%, var(--secondary-0_5) 100%);
`;

const LandingPageBenefitsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1248px;
  gap: 2rem;
`;

const LandingPage = {
  Wrapper: LandingPageWrapper,
  Header: LandingPageHeader,
  Benefits: {
    Wrapper: LandingPageBenefitsWrapper,
    Content: LandingPageBenefitsContent,
  },
};

export default LandingPage;
