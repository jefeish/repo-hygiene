# Repo-Hygiene
Repo practices that maintain cleanliness, health, or optimal conditions.

> An App based solution, if GitHub Actions are not an option.

---

## Initial areas of Repo-Hygiene compliance checks

- Repo size (total)
- Number of branches
- Number of stale branches
- Large files
- Number of open PRs
- Number of Dependabot alerts

---

## Individual Checks
### Input format 

>Note: the input values/format are individual for each check and only require certain mandatory fields.

**Sample**

```yaml
checks:
  # Name of the compliance check (required)
  - check: number_of_branches

    # impact on overall results (required)
    weight: 0.5
  
    # custom fields ...

```

### Output format

This needs to be 'normalized' in order to create an overall score based report

**Sample**

```yaml
check:
  name: number_of_branches
  score: 8
  status: pass
  message: The number of branches are < 5 as required
```

>Note: The App should be triggered on a PR and check the Repo for hygiene policy compliance. 
If the Repo fails the compliance conditions, a check run failure will be set.
