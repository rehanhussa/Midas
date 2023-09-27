import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Collapse } from "@mui/material";
import { Card, CardActions, CardContent } from "@mui/material";
import { Rating } from "@mui/material";
import { Button } from "@mui/material";
import { mockDataTransactions } from "../../data/mockData";
import Header from "../../components/Header";
import useMediaQuery from '@mui/material/useMediaQuery';





const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const List = () => {
    const data = mockDataTransactions;
    const isLoading = false;  // Since you're using mock data, you can set isLoading to false    
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Stock List" subtitle="See your list of stocks." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default List;