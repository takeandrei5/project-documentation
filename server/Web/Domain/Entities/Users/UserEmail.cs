﻿using System.Text.RegularExpressions;
using ProjectDocumentation.Web.Domain.Exceptions;

namespace ProjectDocumentation.Web.Domain.Entities.Users;

public sealed record UserEmail
{
    private static readonly Regex _emailRegex = new(
        @"^([\w\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));

    public UserEmail(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new DomainRuleException("User email cannot be an empty email.");

        if (!_emailRegex.IsMatch(value))
            throw new DomainRuleException("User email cannot be an invalid email.");

        Value = value;
    }

    public string Value { get; }
}
