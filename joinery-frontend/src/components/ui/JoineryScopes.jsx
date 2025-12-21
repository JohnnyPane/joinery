import { ButtonGroup, Button } from "@mantine/core";
import { IconCircleCheck, IconCircle } from "@tabler/icons-react";
import { useResourceContext } from "../../context/ResourceContext.jsx";

const ScopeDelegator = ({ scopeConfig, setScopes, scopes }) => {
  switch (scopeConfig.type) {
    case 'buttons':
      return <ScopeButtonGroup scopeConfig={scopeConfig} setScopes={setScopes} scopes={scopes} />;
    default:
      return null;
  }
}

const ScopeButtonGroup = ({ scopeConfig, setScopes, scopes }) => {
  const handleScopeChange = (value) => {
    setScopes((prevScopes) => {
      const scopeExists = prevScopes.some(scope => scope.name === value);
      if (scopeExists) {
        return prevScopes.filter(scope => scope.name !== value);
      } else {
        return [...prevScopes, { name: value, args: [] }];
      }
    });
  };

  const buttonColor = scopeConfig.buttonColor || 'black';

  return (
    <ButtonGroup className="scope-button-group margin-right" spacing="xs">
      {scopeConfig.options.map((option) => {
        const scopeApplied = scopes.some(scope => scope.name === option.value);

        return (
          <Button
            key={option.value}
            variant={scopeConfig.buttonVariant || "transparent"}
            color={scopeApplied ? buttonColor : 'gray'}
            onClick={() => handleScopeChange(option.value)}
            className="scope-button"
            size="xs"
          >
            {option.label} {scopeApplied ? <IconCircleCheck size={14} className="margin-4-l" /> : <IconCircle size={14} className="margin-4-l" />}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}

const JoineryScopes = ({ scopeConfigs }) => {
  const { scopes, setScopes } = useResourceContext();

  return (
    <div className="joinery-scopes">
      {scopeConfigs.map((scope, index) => (
        <div key={index} className="scope-item">
          <ScopeDelegator
            key={scope.name}
            scopeConfig={scope}
            setScopes={setScopes}
            scopes={scopes}
          />
        </div>
      ))}
    </div>
  );
}

export default JoineryScopes;