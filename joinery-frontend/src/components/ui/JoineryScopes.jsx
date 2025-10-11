import { ButtonGroup, Button } from "@mantine/core";
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
    setScopes((prevScopes) => ([{ name: value }]));
  }

  return (
    <ButtonGroup key={scopeConfig.name} className="scope-button-group" spacing="xs">
      {scopeConfig.options.map((option) => (
        <Button
          key={option.value}
          variant="transparent"
          color={scopes.some(scope => scope.name === option.value) ? 'black' : 'gray'}
          onClick={() => handleScopeChange(option.value)}
          className="scope-button"
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

const JoineryScopes = ({ scopeConfigs }) => {
  const { scopes, setScopes } = useResourceContext();

  return (
    <div className="joinery-scopes">
      {scopeConfigs.map((scope) => (
        <div key={scope.name} className="scope-item">
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