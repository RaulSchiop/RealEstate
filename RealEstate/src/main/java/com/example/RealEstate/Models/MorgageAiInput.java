package com.example.RealEstate.Models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class MorgageAiInput {

    private float income;
    private float downPayment;
    private float rate;
    private int years;
    private float monthlyExpenses;
    private float maxDebtRatio;
    private String city;






}
