using System;
using System.ComponentModel.DataAnnotations;
using Moobaloo.Model.Attributes;
using Moobaloo.Model.Enums;
using Moobaloo.Model.Extensions;
using Newtonsoft.Json;

namespace Moobaloo.Model
{
    public class Survey
    {
        public string Title
        {
            get
            {
                var type = (TitleType)TitleType;
                switch (type)
                {
                    case Enums.TitleType.Other: return OtherTitle;
                    default: return type.GetDescription();
                }
            }
        }
        
        [Required]
        public int TitleType { private get; set; }

        [OtherTitleRequired("TitleType", ErrorMessage = "If \"Other\" is selected you must provide a title.")]
        public string OtherTitle { private get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public String Location { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        [Required]
        [StringLength(2000, ErrorMessage = "Feedback must be less than 2000 characters")]
        public string Feedback { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}