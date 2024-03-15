import "./OrderProgress.scss"
import {Box, Step, StepLabel, Stepper} from "@mui/material";

function OrderProgress () {
    const steps = [
        'Panier',
        'Livraison',
        'Paiement',
    ];
    const currentUrl = window.location.pathname;
    console.log(currentUrl)
    const activeStepNumber = currentUrl === "/checkout/delivery" ? 1 : currentUrl === "/checkout/payment" ? 2 : 0;
    return (
        <Box sx={{ width: '100%', margin: '1.5em 0 0 0' }}>
            <Stepper activeStep={activeStepNumber} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}

export default OrderProgress;