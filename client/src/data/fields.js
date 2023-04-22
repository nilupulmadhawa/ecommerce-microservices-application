
export const fields = [
    {
        label: "ID",
        key: "employees_id",
        alternateMatches: ["ID", "id"],
        fieldType: {
            type: "input",
        },
        validations: [
            {
                rule: "required",
                errorMessage: "id is required",
                level: "error",
            },
            {
                rule: "unique",
                errorMessage: "Duplicate employees_id",
                level: "error",
            },
        ],
    },
    {
        label: "EPF No",
        key: "epf_no",
        alternateMatches: ["EPF No", "employees_id", "Emp No"],
        fieldType: {
            type: "input",
        },
    },
    {
        label: "Basic Salary",
        key: "basic_salary",
        alternateMatches: ["basic_salary", "BASIC SALARY", "Basic Salary"],
        fieldType: {
            type: "input",
        },
        validations: [
            {
                rule: "required",
                errorMessage: "Basic Salary is required",
                level: "error",
            },
        ],
    },
    {
        label: "Gross Salary",
        key: "gross_salary",
        alternateMatches: ["gross_salary", "Gross Salary", "GROSS SALARY"],
        fieldType: {
            type: "input",
        },
        validations: [
            {
                rule: "required",
                errorMessage: "Gross Salary is required",
                level: "error",
            },
        ],
    },
    {
        label: "Net Payable",
        key: "net_payable",
        alternateMatches: ["net_payable", "Net Payable", "NET PAYABLE"],
        fieldType: {
            type: "input",
        },
        validations: [
            {
                rule: "required",
                errorMessage: "Net Payable is required",
                level: "error",
            },
        ],
    },
    {
        label: "Salary Deposit Date",
        key: "salary_deposit_date",
        alternateMatches: ["salary_deposit_date", "Salary Deposit Date", "SALARY DEPOSIT DATE"],
        fieldType: {
            type: "input",
        },
    },
    {
        label: "Total Contributed By School",
        key: "total_contributed_by_school",
        alternateMatches: ["total_contributed_by_school", "Total Contributed By School", "TOTAL CONTRIBUTED BY SCHOOL"],
        fieldType: {
            type: "input",
        },
        validations: [
            {
                rule: "required",
                errorMessage: "Total Contributed By School is required",
                level: "error",
            },
        ],
    },
    {
        label: "Email Sent",
        key: "email_sent",
        alternateMatches: ["email_sent", "email_sent", "EMAIL SENT"],
        fieldType: {
            type: "checkbox",
        },
        validations: [
            {
                rule: "required",
                errorMessage: "Total Contributed By School is required",
                level: "error",
            },
        ],
    },
    {
        label: "Month",
        key: "month",
        alternateMatches: ["Month", "month", "MONTH"],
        fieldType: {
            type: "input",
        },
    },
]