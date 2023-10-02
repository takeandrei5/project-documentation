using System.Text.RegularExpressions;
using MongoDB.Bson;
using ProjectDocumentation.Web.Domain.Exceptions;

namespace ProjectDocumentation.Web.Domain.Entities;

public sealed record Id
{
    private static readonly Regex _hex24Pattern = new(@"^[a-fA-F0-9]{24}$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase,
        TimeSpan.FromMilliseconds(250));

    public Id(string? id = null)
    {
        if (string.IsNullOrWhiteSpace(id))
        {
            Value = ObjectId.GenerateNewId()
               .ToString()!;

            return;
        }

        if (!_hex24Pattern.IsMatch(id))
        {
            throw new DomainRuleException($"The given id {id} does not have a valid format.");
        }

        Value = id;
    }

    public string Value { get; }
}