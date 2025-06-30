import { Box, Typography, Button, Divider } from "@mui/material";
import { useEffect } from "react";
import canvasDots from "../components/heroCanvas";

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
        <div style={{ padding: "6rem" }}>
          <Typography variant="h1" color="black" textAlign="center">
            Reports
          </Typography>
          {/* Reports box */}
          <Box>
            <Box sx={{ width: "100%", minWidth: 800, mx: "auto", my: 4 }}>
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
                    membership conversions for a professional sports team. Using transactional Ticketmaster data across
                    three seasons (2022/23 to 2024/25), the team implemented a multiclass Random Forest classifier to
                    segment customers into four meaningful categories: converted, churned, stayed member, and stayed
                    non-member. The work included extensive data cleaning, domain-driven feature engineering, and the
                    use of K-Nearest Neighbors-based collaborative filtering to enhance customer profiles. Key features
                    like seat preferences, attendance patterns, and behavioral similarity to peer accounts were
                    engineered to optimize predictive power, achieving a high recall of 0.88 for identifying potential
                    converters — a critical metric for the business.
                    <br />
                    <br />
                    To support model transparency and usability, the pipeline includes interpretable outputs through
                    feature importance scoring and is designed for easy re-use across seasons. The team navigated
                    challenges like class imbalance, recall-precision tradeoffs, and constrained historical data,
                    pivoting from a binary to a multiclass classification strategy to improve performance. Their
                    emphasis on business-aligned metrics and a scalable data product demonstrates both technical and
                    stakeholder-oriented thinking, making this a compelling example of applied machine learning in a
                    real-world enterprise context.
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
                borderColor: "rgba(255, 255, 255, 0.2)", // match glass aesthetic
              }}
            />
            <Box sx={{ width: "100%", minWidth: 800, mx: "auto", my: 4 }}>
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
                    model in R to predict IMDb ratings of movies based on features such as gross revenue, budget, and
                    director. The report demonstrates effective end-to-end data science workflow — from importing and
                    cleaning raw movie data, to feature engineering (including creating new variables like combined
                    gross and converting categorical variables), and finally building and interpreting a linear model
                    using lm() and broom::tidy(). It emphasizes statistical rigor by filtering for statistically
                    significant variables, showcasing a data-driven approach to uncovering predictors of movie quality.
                    <br />
                    <br />
                    Beyond the technical modeling, the report highlights the author’s growing statistical intuition and
                    communication ability — explaining the real-world implications of coefficients, interpreting
                    continuous and categorical variables, and identifying modeling limitations like sparse categorical
                    levels and small sample bias. The inclusion of visual output interpretation and reflection on model
                    refinement demonstrates a strong understanding of best practices in exploratory data analysis,
                    reproducibility, and statistical learning. This combination of hands-on implementation and critical
                    thinking makes the report a strong demonstration of foundational data science and communication
                    skills.
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
            <Box sx={{ width: "100%", minWidth: 800, mx: "auto", my: 4 }}>
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
                    hand (left or right) can be predicted using only physical attributes—height and weight—across a
                    comprehensive dataset spanning over a century (1917–2023). The team demonstrated sound machine
                    learning practices, including dataset preprocessing, class imbalance handling with
                    class_weight="balanced", and proper train-test splitting. While the resulting model achieved only a
                    marginal improvement over random guessing (52% accuracy), the authors provided a candid and
                    insightful analysis of the model’s limitations, reflecting a strong understanding of when and why
                    simpler models fail in real-world scenarios.
                    <br />
                    <br />
                    The team also showcased a disciplined approach to project scoping, using standard libraries like
                    scikit-learn, Pandas, and Altair to perform EDA and visual diagnostics. Despite the modest
                    predictive results, the report stood out for its critical evaluation of model performance,
                    transparent discussion of domain assumptions, and thoughtful suggestions for future improvement—such
                    as hyperparameter optimization, inclusion of behavioral variables like handedness, and exploration
                    of deeper models. This level of self-assessment and technical articulation is a valuable signal of
                    practical, production-aware data science skills.
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
            <Box sx={{ width: "100%", minWidth: 800, mx: "auto", my: 4 }}>
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
                {/* Left: Responsive Image */}
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

                {/* Right: Content */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    End-To-End Regression Project for Airbnb Data In NYC
                  </Typography>
                  <Typography sx={{ fontStyle: "italic", mb: 2 }}>
                    Jay Mangat, Farhan Faisal, Daria Khon, Brian Chang
                  </Typography>
                  <Typography variant="body2">
                    This project applies an end-to-end regression pipeline to predict the popularity of Airbnb listings
                    in NYC, using number of reviews per month as a proxy for demand. The team engineered insightful
                    features—such as sentiment scores from listing titles and the month of last review—and evaluated a
                    range of models including Ridge, Elastic Net, Random Forest, and LightGBM. With proper preprocessing
                    (e.g., imputation, one-hot encoding, scaling) and rigorous evaluation via cross-validation, the
                    final optimized LightGBM model achieved an R² of 0.693 on the test set, showing strong
                    generalization and low overfitting.
                    <br />
                    <br />
                    Beyond performance, the project demonstrates maturity in handling real-world data issues, such as
                    skewed distributions, missing values, and feature redundancy. The team leveraged SHAP values and
                    permutation importance to interpret model behavior and inform future improvements. Their disciplined
                    approach—from baseline modeling and hyperparameter tuning to clear communication of
                    trade-offs—highlights their readiness for applied machine learning roles with production-grade
                    responsibilities.
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
      </Box>
    </>
  );
}

export default ReportsPage;
