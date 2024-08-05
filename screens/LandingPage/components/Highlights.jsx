import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Interface Simplificada',
    description:
      'Nosso emissor se ajusta facilmente às suas necessidades, impulsionando a eficiência e simplificando suas tarefas.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Construído para Durar',
    description:
      'Experimente uma durabilidade incomparável que vai além do esperado, representando um investimento duradouro.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Ótima Experiência do Usuário',
    description:
      'Integre nosso produto à sua rotina com uma interface intuitiva e fácil de usar.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Funcionalidade Inovadora',
    description:
      'Mantenha-se à frente com recursos que estabelecem novos padrões, atendendo às suas necessidades em constante evolução melhor do que qualquer outro.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Suporte Confiável',
    description:
      'Conte com nosso suporte ao cliente responsivo, oferecendo assistência que vai além da compra.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Precisão em Cada Detalhe',
    description:
      'Desfrute de um produto meticulosamente elaborado onde pequenos toques têm um impacto significativo em sua experiência geral.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Nosso Diferencial
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Descubra o que diferencia o nosso emissor de NFs: adaptabilidade, durabilidade, design intuitivo e inovador. Além de outras funções pensadas para facilitar a vida de nossos colaboradores.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
