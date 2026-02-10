package com.paolaestetica;

public class Main {
    public static void main(String[] args) {
        System.out.println("=======================================");
        System.out.println("   SISTEMA DE GESTÃO PAOLA ESTÉTICA    ");
        System.out.println("           MOTOR JAVA ATIVADO          ");
        System.out.println("=======================================");
        
        // Simulação de um lançamento
        String procedimento = "Limpeza de Pele";
        double valorCobrado = 100.00;
        double taxaSalao = valorCobrado * 0.30;
        double custoInsumo = 1.72;
        
        double lucroReal = valorCobrado - taxaSalao - custoInsumo;

        System.out.println("Procedimento realizado: " + procedimento);
        System.out.println("Faturamento: R$ " + valorCobrado);
        System.out.println("Lucro Líquido Final: R$ " + lucroReal);
        System.out.println("=======================================");
    }
}