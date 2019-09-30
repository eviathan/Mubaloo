using System;
using System.ComponentModel;

namespace Moobaloo.Model.Enums
{
    public enum TitleType
    {
        [Description("Mr")]
        Mr,
        [Description("Mrs")]
        Mrs,
        [Description("Miss")]
        Miss,
        [Description("Ms")]
        Ms,
        Other
    }
}
