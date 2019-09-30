using System;
using System.ComponentModel.DataAnnotations;
using Moobaloo.Model.Enums;

namespace Moobaloo.Model.Attributes
{
    public class OtherTitleRequiredAttribute : ValidationAttribute
    {
        private readonly string _comparisonProperty;

        public OtherTitleRequiredAttribute(string propertyName)
        {
            _comparisonProperty = propertyName;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            ErrorMessage = ErrorMessageString;

            var otherTitleValue = (string)value;
            var property = validationContext.ObjectType.GetProperty(_comparisonProperty);

            if (property == null) throw new ArgumentException("Property with this name not found");

            var comparisonValue = (TitleType)property.GetValue(validationContext.ObjectInstance);

            if (comparisonValue == TitleType.Other && !string.IsNullOrWhiteSpace(otherTitleValue))
                return new ValidationResult(ErrorMessage);

            return ValidationResult.Success;
        }
    }
}
