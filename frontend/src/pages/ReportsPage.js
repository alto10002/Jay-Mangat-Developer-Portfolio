import { Box, Typography, Button, Divider } from "@mui/material";
import { useEffect } from "react";
import canvasDots from "../components/heroCanvas";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FadeInSection = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
      }}
    >
      {children}
    </motion.div>
  );
};

function ReportsPage() {
  useEffect(() => {
    document.title = "JM | Reports";
    canvasDots(["rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)"], "rgb(0, 0, 0)");
  }, []);

  return (
    <>
      <canvas
        id="dotsCanvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none",
          backgroundColor: "#424fc7",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      <FadeInSection delay={1}>
        <div style={{ padding: "6rem" }}>
          <Typography variant="h1" color="white" textAlign="center">
            Reports
          </Typography>
          {/* Reports box */}
          <Box>
            <Box sx={{ width: "100%", minWidth: 800, maxWidth: 1800, mx: "auto", my: 4 }}>
              <Box
                className="glass-card"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  padding: 3,
                  borderRadius: "1rem",
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  color: "white",
                }}
              >
                <Box
                  component="img"
                  src="/reports/canucksReportThumbnail.jpg"
                  alt="Report cover"
                  sx={{
                    width: { xs: "100%", sm: 200 },
                    height: { xs: "auto", sm: 260 },
                    objectFit: "cover",
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Canucks Season Ticket Member Prediction Using Multiclass Random Forest Regression
                  </Typography>
                  <Typography sx={{ fontStyle: "italic", mb: 2 }}>
                    Jay Mangat, Anna Nandar, Julian Daduica, Yeji Sohn
                  </Typography>
                  <Typography variant="body2">
                    This project presents a robust machine learning pipeline developed to predict season ticket
                    membership conversions for Canucks Sports and Entertainment (CSE). We used CSE's ticket sales data obtained from Ticketmaster and implemented various supervised and unsupervised models
                    including kmeans, GMMs, logisitic regression, and a multiclass Random Forest classifier. This final model had four categories: converted, churned, stayed member, and stayed
                    non-member and provided us with the best results. As part of our final deliverable the pipeline also includes extensive data cleaning, domain-driven feature engineering, and the
                    use of KNN-based collaborative filtering to create customer profiles. Based on CSE's parameters we aimed for high recall within our models and achieved a high recall of 0.88 with our Random Forest Classifier. 
                    <br />
                    <br />
                    The pipeline can be easily cloned and used via <i>make all</i> as all required functions are taken care of within our make file. Its also built to be used for future years assuming the future input
                    matches the input we used when creating the model. Some challenges included class imbalance between members and non-members as well as constrained historical data only going back to 2022.
                  </Typography>
                  <Button
                    href="/reports/canucksReport.pdf"
                    download
                    sx={{
                      background: "rgba(255, 255, 255, 0.3)",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                      borderRadius: "12px",
                      px: 2,
                      py: 1,
                      mt: 2,
                      fontWeight: "bold",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.5)",
                      },
                    }}
                  >
                    Download Report
                  </Button>
                </Box>
              </Box>
            </Box>
            <Divider
              sx={{
                my: 4,
                borderBottomWidth: 4,
                borderColor: "rgba(255, 255, 255, 0.2)", 
              }}
            />
            <Box sx={{ width: "100%", minWidth: 800, maxWidth: 1800, mx: "auto", my: 4 }}>
              <Box
                className="glass-card"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  padding: 3,
                  borderRadius: "1rem",
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  color: "white",
                }}
              >
                <Box
                  component="img"
                  src="/reports/regressionReportThumbnail.jpg"
                  alt="Report cover"
                  sx={{
                    width: { xs: "100%", sm: 200 },
                    height: { xs: "auto", sm: 260 },
                    objectFit: "cover",
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Linear Regression Demystified
                  </Typography>
                  <Typography sx={{ fontStyle: "italic", mb: 2 }}>Jay Mangat</Typography>
                  <Typography variant="body2">
                    This project presents a clear, hands-on walkthrough of building and interpreting a linear regression
                    model in R  and using that model to predict IMDb ratings of movies based on features such as gross revenue, budget, and
                    director. The report employs a beginner data science workflow as a way to lower the barrier of entry for people who are new to the subject.
                    The includes from importing and cleaning raw movie data, feature engineering by combining some variables, and interpreting a model's output
                    using lm() and broom::tidy(). This interpretation also includes explanations for common statistical tools such as significant variables.
                    <br />
                    <br />
                    This report was a challenge to myself as I wanted to see if I could effectively explain complex topics to an audience with no, or 
                    very little, domain knowledge while retaining the purpose of the report. I didn't shy away from this challenge by removing tough concepts
                    altogether and instead included them while doing my best to simplify their explanations (i.e. coefficients, continuous/categorical variables, small sample bias).
                  </Typography>
                  <Button
                    href="/reports/regressionReport.pdf"
                    download
                    sx={{
                      background: "rgba(255, 255, 255, 0.3)",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                      borderRadius: "12px",
                      px: 2,
                      py: 1,
                      mt: 2,
                      fontWeight: "bold",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.5)",
                      },
                    }}
                  >
                    Download Report
                  </Button>
                </Box>
              </Box>
            </Box>
            <Divider
              sx={{
                my: 4,
                borderBottomWidth: 4,
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
            />
            <Box sx={{ width: "100%", minWidth: 800, maxWidth: 1800, mx: "auto", my: 4 }}>
              <Box
                className="glass-card"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  padding: 3,
                  borderRadius: "1rem",
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  color: "white",
                }}
              >
                <Box
                  component="img"
                  src="/reports/nhlReportThumbnail.jpg"
                  alt="Report cover"
                  sx={{
                    width: { xs: "100%", sm: 200 },
                    height: { xs: "auto", sm: 260 },
                    objectFit: "cover",
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Using NHL Data To Predict Prospective Player's Shooting Hand
                  </Typography>
                  <Typography sx={{ fontStyle: "italic", mb: 2 }}>Jay Mangat, Michael Gelfand, Dominic Lam</Typography>
                  <Typography variant="body2">
                    This project applies a logistic regression classifier to explore whether an NHL player’s shooting
                    hand (left or right) can be predicted using only physical attributes across a
                    comprehensive dataset spanning over a century (1917–2023). We adhered to all recommended machine
                    learning practices such as train-test splitting, dataset preprocessing, and class imbalance handling but
                    the resulting model achieved only a marginal improvement over random guessing (52% accuracy). This was an interesting
                    project for myself and my team as it was made clear to us that possessing sufficient domain expertise may be just as, if not more
                    important, than following standard machine learing practices.
                  </Typography>
                  <Button
                    href="/reports/nhlReport.pdf"
                    download
                    sx={{
                      background: "rgba(255, 255, 255, 0.3)",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                      borderRadius: "12px",
                      px: 2,
                      py: 1,
                      mt: 2,
                      fontWeight: "bold",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.5)",
                      },
                    }}
                  >
                    Download Report
                  </Button>
                </Box>
              </Box>
            </Box>
            <Divider
              sx={{
                my: 4,
                borderBottomWidth: 4,
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
            />
            <Box sx={{ width: "100%", minWidth: 800, maxWidth: 1800, mx: "auto", my: 4 }}>
              <Box
                className="glass-card"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  padding: 3,
                  borderRadius: "1rem",
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  color: "white",
                }}
              >
                <Box
                  component="img"
                  src="/reports/airbnbReportThumbnail.jpg"
                  alt="Report cover"
                  sx={{
                    width: { xs: "100%", sm: 200 },
                    height: { xs: "auto", sm: 260 },
                    objectFit: "cover",
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    End-To-End Regression Project for Airbnb Data In NYC
                  </Typography>
                  <Typography sx={{ fontStyle: "italic", mb: 2 }}>
                    Jay Mangat, Farhan Faisal, Daria Khon, Brian Chang
                  </Typography>
                  <Typography variant="body2">
                    This project creates a regression pipeline to predict the popularity of Airbnb listings
                    in NYC using number of reviews per month as a proxy for demand. We engineered 
                    features, such as sentiment scores from listing titles and the month of last review, and evaluated a
                    range of models including Ridge, Elastic Net, Random Forest, and LightGBM. With proper preprocessing
                    (e.g., imputation, one-hot encoding, scaling) and evaluation via cross-validation, the
                    final optimized LightGBM model achieved an R² of 0.693 on the test set, showing strong
                    generalization and low overfitting.
                    <br />
                    <br />
                    Beyond performance, the project demonstrates maturity in handling real-world data issues, such as
                    skewed distributions, missing values, and feature redundancy. We also leveraged SHAP values and
                    permutation importance to interpret model behavior and inform future improvements.
                  </Typography>
                  <Button
                    href="/reports/airbnbReport.pdf"
                    download
                    sx={{
                      background: "rgba(255, 255, 255, 0.3)",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                      borderRadius: "12px",
                      px: 2,
                      py: 1,
                      mt: 2,
                      fontWeight: "bold",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.5)",
                      },
                    }}
                  >
                    Download Report
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </FadeInSection>
      </Box>
    </>
  );
}

export default ReportsPage;
